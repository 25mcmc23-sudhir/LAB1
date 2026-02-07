var cityInput = document.getElementById("cityInput");
var getWeatherBtn = document.getElementById("getWeatherBtn");
var weatherResult = document.getElementById("weatherResult");
var apiKey = "API_KEY_HERE";
// Note: The API key has been used in the application. However, it has not been disclosed here to maintain privacy and security.

getWeatherBtn.addEventListener("click", function () {
    var city = cityInput.value;
    if (city === "") {
        weatherResult.innerHTML = "❌ Please enter a city name";
        return;
    }
    fetchWeather(city);
});
function fetchWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q="
        .concat(city, "&units=metric&appid=")
        .concat(apiKey);
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data);
        })
        .catch(function () {
            weatherResult.innerHTML = "❌ City not found";
        });
}
function displayWeather(data) {
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var condition = data.weather[0].description;
    weatherResult.innerHTML = "\n        <p>\uD83C\uDF21\uFE0F Temperature: "
        .concat(temp, " \u00B0C</p>\n        <p>\uD83D\uDCA7 Humidity: ")
        .concat(humidity, "%</p>\n        <p>\u26C5 Condition: ")
        .concat(condition, "</p>\n    ");
}
