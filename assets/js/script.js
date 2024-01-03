// Allow the doc to load
document.addEventListener("DOMContentLoaded", () => {
  // Grab the elements that are going to get manipulated
  const searchBtn = document.querySelector(".searchBtn");
  const cityName = document.querySelector(".search-input");
  const currentForecast = document.querySelector(".current-forecast");
  const forecast = document.querySelector(".forecast");
  const divRow = document.getElementById("row");
  const pastSearchBtn = document.getElementById("pastSearchBtn");

  const apiKey = "7d625d8ae80758ec40d01750c5681218"; // Api Key

  const retreiveItems = function () {
    return JSON.parse(localStorage.getItem("CityName"));
  };

  var items = retreiveItems();

  if (items == null) {
    items = [];
  }

  const currentWeather = function (cityNameValue) {
    const currentWeatherApi =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityNameValue +
      "&appid=" +
      apiKey +
      "&units=metric";

    fetch(currentWeatherApi) // ask server for data
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.cod && data.cod !== 200) {
          // Check if the 'cod' property indicates an error
          alert("Error: " + data.message);
        } else {
          items.push(cityNameValue);
          localStorage.setItem("CityName", JSON.stringify(items));
          displayCurrentWeather(data);
          updatePastSearchBtns();
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("City not found or there was an issue with the request.");
      });
  };

  const futureWeather = function (cityNameValue) {
    const futureWeatherApi =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityNameValue +
      "&appid=" +
      apiKey +
      "&units=metric";

    fetch(futureWeatherApi)
      .then(function (response) {
        if (response.status === 404) {
          alert("Weather fetch error: " + response.status);
          return null; // Return null to indicate an error
        }
        return response.json();
      })
      .then(function (data) {
        divRow.innerHTML = " ";
        displayFutureWeather(data);
      })
      .catch(function (error) {
        console.error(error);
        alert("City not found or there was an issue with the request.");
      });
  };

  const displayFutureWeather = (data) => {
    if (data.list) {
      for (let i = 1; i < data.list.length; i += 8) {
        const div2 = document.createElement("div");
        div2.setAttribute("class", "col-12 col-sm-6 col-md-2");

        const div3 = document.createElement("div");
        div3.setAttribute("class", "card mb-3");

        const titleEl = document.createElement("h3");
        titleEl.setAttribute("class", "card-header text-center fs-");

        var dt_txt = data.list[i].dt_txt;
        var DateTextFormated = dt_txt.split(" ")[0]; // Extracting the date part

        titleEl.innerHTML = DateTextFormated;

        const imgEl = document.createElement("img");
        imgEl.setAttribute("class", "weather-icon");

        if (data.list[i].weather[0].main == "Clouds") {
          imgEl.src = "assets/Weather-Imgs/clouds.png";
        } else if (data.list[i].weather[0].main == "Clear") {
          imgEl.src = "assets/Weather-Imgs/clear.png";
        } else if (data.list[i].weather[0].main == "Rain") {
          imgEl.src = "assets/Weather-Imgs/rain.png";
        } else if (data.list[i].weather[0].main == "Drizzle") {
          imgEl.src = "assets/Weather-Imgs/drizzle.png";
        } else if (data.list[i].weather[0].main == "Mist") {
          imgEl.src = "assets/Weather-Imgs/mist.png";
        } else if (data.list[i].weather[0].main == "Humidity") {
          imgEl.src = "assets/Weather-Imgs/humidity.png";
        } else if (data.list[i].weather[0].main == "Snow") {
          imgEl.src = "assets/Weather-Imgs/snow.png";
        } else if (data.list[i].weather[0].main == "Wind") {
          imgEl.src = "assets/Weather-Imgs/wind.png";
        }

        const div4 = document.createElement("div");
        div4.setAttribute("class", "card-body p-4");

        const tempEl = document.createElement("p");
        tempEl.setAttribute("class", "card-text");
        tempEl.innerHTML =
          "Temp: " + Math.round(data.list[i].main.temp) + " °C";

        const feelsLikeEl = document.createElement("p");
        feelsLikeEl.setAttribute("class", "card-text");
        feelsLikeEl.innerHTML =
          "Feels Like: " + Math.round(data.list[i].main.feels_like) + " °C";

        const windEl = document.createElement("p");
        windEl.setAttribute("class", "card-text");
        windEl.innerHTML =
          "Wind: " + data.list[i].wind.speed.toFixed(1) + " m/s";

        const humidityEl = document.createElement("p");
        humidityEl.setAttribute("class", "card-text");
        humidityEl.innerHTML = "Humidity: " + data.list[i].main.humidity + " %";

        // Append elements in the correct order
        divRow.appendChild(div2);
        div2.appendChild(div3);
        div3.appendChild(titleEl);
        div3.appendChild(imgEl);
        div3.appendChild(div4);
        div4.appendChild(tempEl);
        div4.appendChild(feelsLikeEl);
        div4.appendChild(windEl);
        div4.appendChild(humidityEl);
      }
    } else {
      console.error("Invalid data format");
    }
  };

  const displayCurrentWeather = (data) => {
    // Check if data.name is not null or undefined
    if (data.name == null) {
      alert(data.message);
      return;
    }

    currentForecast.setAttribute("class", "after-Search");
    currentForecast.innerHTML = "";
    var h3El = document.createElement("h3");
    // h3El.innerHTML = "Date for weather";

    const cityName = data.name;
    var unixTimeStamp = data.dt;
    var convertedTime = dayjs.unix(unixTimeStamp).format("MM/DD/YYYY");

    h3El.innerHTML = cityName + " " + "(" + convertedTime + ")";

    var weatherImg = document.createElement("img");
    weatherImg.setAttribute("class", "weather-icon");
    // weatherImg.src = "assets/Weather-Imgs/clear.png";

    if (data.weather[0].main == "Clouds") {
      weatherImg.src = "assets/Weather-Imgs/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "assets/Weather-Imgs/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.src = "assets/Weather-Imgs/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "assets/Weather-Imgs/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "assets/Weather-Imgs/mist.png";
    } else if (data.weather[0].main == "Humidity") {
      weatherImg.src = "assets/Weather-Imgs/humidity.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImg.src = "assets/Weather-Imgs/snow.png";
    } else if (data.weather[0].main == "Wind") {
      weatherImg.src = "assets/Weather-Imgs/wind.png";
    }

    var tempEl = document.createElement("p");
    tempEl.innerHTML = "Temp: " + Math.round(data.main.temp) + " °C";

    var feelsLikeEl = document.createElement("p");
    feelsLikeEl.innerHTML =
      "Feels Like: " + Math.round(data.main.feels_like) + " °C";

    var windEl = document.createElement("p");
    windEl.innerHTML = "Wind: " + data.wind.speed.toFixed(1) + " m/s";

    var humidityEl = document.createElement("p");
    humidityEl.innerHTML = "Humidity: " + data.main.humidity + " %";

    currentForecast.appendChild(h3El);
    currentForecast.appendChild(weatherImg);
    currentForecast.appendChild(tempEl);
    currentForecast.appendChild(feelsLikeEl);
    currentForecast.appendChild(windEl);
    currentForecast.appendChild(humidityEl);
  };

  const getCityName = () => {
    const cityNameValue = cityName.value.trim(); // grab and trim the vlaue of the input

    if (!cityNameValue) {
      return; // check if there is nothing, else return
    } else if (!isNaN(cityNameValue)) {
      alert("Please enter a city name");
      // check if there is a number, else return
      return;
    }
    currentWeather(cityNameValue);
    futureWeather(cityNameValue);
  };

  // Function to handle click on past search button
  const handlePastSearchClick = (event) => {
    const cityNameValue = event.target.innerHTML;
    currentWeather(cityNameValue);
    futureWeather(cityNameValue);
  };

  // Function to create or update past search buttons
  const updatePastSearchBtns = function () {
    // Clear pastSearchBtn before adding buttons
    pastSearchBtn.innerHTML = "";

    const addedItems = new Set();

    for (let i = 0; i < items.length; i++) {
      const currentItem = items[i];

      // Check if the item is not already added
      if (!addedItems.has(currentItem)) {
        const btn = document.createElement("button");
        btn.setAttribute("class", "past-searchBtn");
        btn.innerHTML = currentItem;

        // Add click event listener to each past search button
        btn.addEventListener("click", handlePastSearchClick);

        pastSearchBtn.appendChild(btn);
        addedItems.add(currentItem);
      }
    }
  };

  // Event listener for the search button
  searchBtn.addEventListener("click", getCityName);
});
