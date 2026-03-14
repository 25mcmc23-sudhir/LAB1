import React, { useEffect, useState } from "react";

function Forecast({ city }) {
    const [forecast, setForecast] = useState([]);

    const API_KEY = "API KEY (Not included due to Privacy)";

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
        )
            .then((res) => res.json())
            .then((data) => {
                setForecast(data.list.slice(0, 5));
            });
    }, [city]);

    return (
        <div>
            <h3>5 Day Forecast</h3>
            {forecast.map((item, index) => (
                <div key={index}>
                    <p>{item.dt_txt}</p>
                    <p>Temp: {item.main.temp} °C</p>
                    <p>{item.weather[0].description}</p>
                </div>
            ))}
        </div>
    );
}

export default Forecast;
