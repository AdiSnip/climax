import React from 'react';

const WeatherReport = ({ btnclicked, report, reportdata }) => {
    if (!report || !reportdata) return null; // Hide if no report or data
    const { current_weather, hourly } = reportdata;

    const weatherCodes = {
        clear: [0, 1], // Clear sky, Mainly clear
        cloudy: [2, 3, 45, 48], // Partly cloudy, Overcast, Fog, Rime fog
        rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], // Drizzle, Rain, Freezing rain, Showers
        thunder: [95, 96, 99] // Thunderstorms with/without hail
      };
    function getWeatherType(code) {
        for (const [type, codes] of Object.entries(weatherCodes)) {
          if (codes.includes(code)) return type;
        }
        return "unknown";
      }
    
    return (
        <div className="fixed top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Weather Report</h2>

                {/* Current Weather Section */}
                <div className="text-center mb-4">
                    <p className="text-xl font-semibold">
                        Temperature: <span className="text-blue-600">{current_weather.temperature}°C</span>
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">{getWeatherType(current_weather.weathercode)}</span>
                    </p>
                    <p className="text-sm text-gray-500">Wind Speed: {current_weather.windspeed} km/h</p>
                </div>

                {/* Hourly Forecast Section */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Hourly Forecast (24 Hours)</h3>
                    <ul className="flex space-x-3 py-2 overflow-x-auto">
                        {hourly.temperature_2m.slice(0,24).map((temp, index) => (
                            <li key={index} className="bg-gray-100 p-2 rounded-lg text-center min-w-[80px]">
                                <p className="text-sm">{index + 1}:00</p>
                                <p className="text-lg font-bold">{temp}°C</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Close Button */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={btnclicked}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeatherReport;
