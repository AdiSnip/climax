import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b pb-[5vh] pt-[10vh] from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center px-6">
      {/* Header Section */}
      <h1 className="text-4xl font-bold mb-4">About Our Weather App</h1>
      <p className="text-lg text-center max-w-2xl">
        Welcome to our weather forecasting website! We provide real-time weather updates 
        for cities around the world. Whether you're planning your day or traveling, 
        stay informed with accurate weather data.
      </p>

      {/* Features Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white text-black bg-opacity-10 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold">🌦 Real-Time Weather</h2>
          <p>Get live weather updates with temperature, wind speed, and conditions.</p>
        </div>
        <div className="bg-white text-black bg-opacity-10 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold">🌍 Global Coverage</h2>
          <p>Search weather details for any city in the world.</p>
        </div>
        <div className="bg-white text-black bg-opacity-10 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold">📊 Hourly Forecast</h2>
          <p>Check temperature trends for the next few hours.</p>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-3">Technologies Used</h2>
        <p className="text-center">
          Built with <span className="font-semibold">React.js</span>, <span className="font-semibold">Axios</span>, and <span className="font-semibold">Open-Meteo API</span>.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-8">
        <Link to={'/'} className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-md hover:bg-gray-200 transition">Go to Home</Link>
      </div>
    </div>
  );
};

export default About;
