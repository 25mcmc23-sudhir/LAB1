const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const getWeatherBtn = document.getElementById(
    "getWeatherBtn",
) as HTMLButtonElement;
const weatherResult = document.getElementById(
    "weatherResult",
) as HTMLDivElement;

const apiKey: string = "API_KEY_HERE";
// Note: The API key has been used in the application. However, it has not been disclosed here to maintain privacy and security.

getWeatherBtn.addEventListener("click", () => {
    const city: string = cityInput.value;

    if (city === "") {
        weatherResult.innerHTML = "❌ Please enter a city name";
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city: string): void {
    const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch(() => {
            weatherResult.innerHTML = "❌ City not found";
        });
}

function displayWeather(data: any): void {
    const temp: number = data.main.temp;
    const humidity: number = data.main.humidity;
    const condition: string = data.weather[0].description;

    weatherResult.innerHTML = `
        <p>🌡️ Temperature: ${temp} °C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>⛅ Condition: ${condition}</p>
    `;
}

