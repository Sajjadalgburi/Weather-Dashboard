// Allow the doc to load
document.addEventListener("DOMContentLoaded", () => {
  // Grab the elements that are going to get manipulated
  const searchBtn = document.querySelector(".searchBtn");
  const cityName = document.querySelector(".search-input");
  const currentForecast = document.querySelector(".current-forecast");
  const divRow = document.getElementById("row");

  const apiKey = "7d625d8ae80758ec40d01750c5681218"; // Api Key

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
        console.log(data);
        displayCurrentWeather(data);
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
        }
        return response.json();
      })
      .then(function (data) {
        // Check if the 'list' property exists in the data
        divRow.innerHTML = " ";
        displayFutureWeather(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const displayFutureWeather = (data) => {
    if (data.list) {
      for (let i = 1; i < data.list.length; i += 8) {
        console.log(data.list[i]);

        const div2 = document.createElement("div");
        div2.setAttribute("class", "col-12 col-sm-6 col-md-2");

        const div3 = document.createElement("div");
        div3.setAttribute("class", "card mb-3");

        const titleEl = document.createElement("h3");
        titleEl.setAttribute("class", "card-header");
        titleEl.textContent = "LOL"; // Set the title text content

        const imgEl = document.createElement("img");
        imgEl.setAttribute("class", "weather-icon");

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

    // console.log(convertedTime);
    // console.log(unixTimeStamp);

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

  searchBtn.addEventListener("click", getCityName); // on click display the getCityName function
});
