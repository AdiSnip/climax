import React, { useEffect, useState } from "react";
import axios from "axios";

const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Default Location (Change as needed)
    const latitude = 28.7041; // Example: Delhi
    const longitude = 77.1025;

    // Fetch 7-day weather forecast
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      )
      .then((response) => {
        setForecastData(response.data.daily);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch forecast data");
        setLoading(false);
      });
  }, []);

  const weatherCodes = {
    clear: [0, 1],
    cloudy: [2, 3, 45, 48],
    rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    thunder: [95, 96, 99],
  };

  const getWeatherType = (code) => {
    for (const [type, codes] of Object.entries(weatherCodes)) {
      if (codes.includes(code)) return type;
    }
    return "unknown";
  };

  return (
    <div className="h-auto pt-[10vh] bg-gradient-to-b from-blue-400 to-indigo-600 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">7-Day Weather Forecast</h1>

      {loading && <p className="text-center text-lg">Loading forecast...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {forecastData && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {forecastData.time.map((date, index) => (
            <div
              key={index}
              className="bg-white text-black p-4 rounded-lg shadow-md text-center"
            >
              <h2 className="text-lg font-bold">{new Date(date).toDateString()}</h2>
              <img
                className="w-16 mx-auto my-2"
                src={`./Icons/${getWeatherType(forecastData.weathercode[index])}.png`}
                alt="Weather Icon"
              />
              <p className="text-md">Max: {forecastData.temperature_2m_max[index]}°C</p>
              <p className="text-md">Min: {forecastData.temperature_2m_min[index]}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
