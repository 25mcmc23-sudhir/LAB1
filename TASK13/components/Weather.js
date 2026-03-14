import React, { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
    const [city, setCity] = useState("Secunderabad");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState("");

    const API_KEY = "API KEY (Not included due to Privacy)";

    useEffect(() => {
        fetchWeather(city);
        fetchForecast(city);
    }, []);

    // Fetch Current Weather
    const fetchWeather = async (cityName) => {
        try {
            setError("");

            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
            );

            if (!res.ok) {
                throw new Error("City not found");
            }

            const data = await res.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        }
    };

    // Fetch 5 Day Forecast
    const fetchForecast = async (cityName) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`,
            );

            const data = await res.json();

            // take one forecast per day
            const daily = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

            setForecast(daily.slice(0, 5));
        } catch {
            setError("Failed to fetch forecast data");
        }
    };

    // Search
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
        fetchForecast(city);
    };

    return (
        <div className="weather-container">
            <h1>🌤 Weather App</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button type="submit">Search</button>
            </form>

            {/* Error Message */}
            {error && <p className="error">{error}</p>}

            {/* Current Weather */}
            {weather && (
                <div className="weather-card">
                    <h2>{weather.name}</h2>
                    <h3>{weather.main.temp} °C</h3>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>{weather.weather[0].description}</p>
                </div>
            )}

            {/* 5 Day Forecast */}
            {forecast.length > 0 && (
                <div className="forecast">
                    <h2>5-Day Forecast</h2>

                    <div className="forecast-container">
                        {forecast.map((day, index) => (
                            <div key={index} className="forecast-card">
                                <p>{day.dt_txt.split(" ")[0]}</p>
                                <h4>{day.main.temp} °C</h4>
                                <p>{day.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
