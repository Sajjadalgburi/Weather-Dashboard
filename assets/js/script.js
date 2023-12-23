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

        const h3El = document.createElement("h3");

        var currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
        console.log("Current date:", currentDate);

        const unixTimeStamp = data.dt;
        console.log(unixTimeStamp);

        h3El.innerHTML = data.dt;
        console.log(currentForecast);
        currentForecast.appendChild(h3El);
      });
  };

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
