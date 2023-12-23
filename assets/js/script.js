// Allow the doc to load
document.addEventListener("DOMContentLoaded", () => {
  // Grab the elements that are going to get manipulated
  const searchBtn = document.querySelector(".searchBtn");
  const cityName = document.querySelector(".search-input");
  const currentForecast = document.querySelector(".current-forecast");

  const apiKey = "2f2d6a3fd4509d18a14337b7899f0483"; // Api Key

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
        displayWeather(data);
      });
  };

  const displayWeather = (data) => {
    // Check if data is not null or undefined

    if (!data) {
      alert("Weather data is undefined or null");
      return;
    }

    currentForecast.innerHTML = "";
    var h3El = document.createElement("h3");
    h3El.innerHTML = "Date for weather";

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
    windEl.innerHTML = "Wind: " + Math.round(data.wind.speed) + " m/s";

    var humidityEl = document.createElement("p");
    humidityEl.innerHTML = "Humidity: " + data.main.humidity + " %";

    var unixTimeStamp = data.dt;
    console.log(unixTimeStamp);

    currentForecast.appendChild(h3El);
    currentForecast.appendChild(weatherImg);
    currentForecast.appendChild(tempEl);
    currentForecast.appendChild(feelsLikeEl);
    currentForecast.appendChild(windEl);
    currentForecast.appendChild(humidityEl);
  };

  // const changeWeatherImgs = (weatherImg) => {
  //   if (data.weather[0].main == "Clouds") {
  //   }
  // };

  // I can use https://openweathermap.org/api/geocoding-api in order to grab current weather api
  // after grabbing the current forecast, I need to grab the weather data then display/ append into the div (find in html)
  // after displaying the current wather api, -> display the upcoming 5 days through https://openweathermap.org/forecast5#builtin
  // the 5 day forecast api can use {cityname} instead of corodinates which makes it easier to search
  // after grabbing the 5 day forecats, I need to grab the weather data then display/ append into the cards in html

  const getCityName = () => {
    const cityNameValue = cityName.value.trim(); // grab and trim the vlaue of the input

    if (!cityNameValue) {
      return; // check if there is nothing, else return
    } else if (!isNaN(cityNameValue)) {
      // check if there is a number, else return
      return;
    }
    currentWeather(cityNameValue);
  };

  searchBtn.addEventListener("click", getCityName); // on click display the getCityName function
});
