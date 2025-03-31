/* This code is a React component named `App` that serves as the main entry point for a React
application. Here's a breakdown of what the code is doing: */
import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Container from './Components/Container';
import axios from 'axios';
import Footer from './Components/Footer';
import { Routes,Route } from 'react-router-dom';
import About from './Pages/About.jsx';
import Daily from './Pages/Daily.jsx';
import Contact from './Pages/Contact.jsx';
import Hourly from './Pages/Hourly.jsx';
const App = () => {
/* The code snippet you provided is initializing multiple state variables using the `useState` hook in
a React functional component named `App`. Here's a breakdown of what each state variable is doing: */
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
    const [address, setAddress] = useState({
      city: "Unknown City",
      state: "Unknown State",
      country: "Unknown Country",
    });
    const [error, setError] = useState("");

/* The `weatherCodes` object in the `App` component is serving as a mapping between weather types and
their corresponding weather codes. Each key in the object represents a weather type (e.g., clear,
cloudy, rain, thunder), and the associated value is an array of weather codes that are related to
that particular weather type. */
  const weatherCodes = {
    clear: [0, 1], // Clear sky, Mainly clear
    cloudy: [2, 3, 45, 48], // Partly cloudy, Overcast, Fog, Rime fog
    rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], // Drizzle, Rain, Freezing rain, Showers
    thunder: [95, 96, 99], // Thunderstorms with/without hail
  };
/**
 * The function `getWeatherType` takes a weather code as input and returns the corresponding weather
 * type based on a predefined mapping.
 * @returns The function `getWeatherType` returns the weather type corresponding to the given weather
 * code. If the code matches any of the codes in the `weatherCodes` object, it returns the
 * corresponding weather type. If no match is found, it returns "unknown".
 */
  const getWeatherType = (code) => {
    for (const [type, codes] of Object.entries(weatherCodes)) {
      if (codes.includes(code)) return type;
    }
    return "unknown";
  };
/* This `useEffect` hook is responsible for fetching the current geolocation coordinates of the user.
Here's a breakdown of what it's doing: */
    useEffect(() => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by this browser.");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const result = await response.json();
            const address = result.address || {};
            setAddress({
              city: address.city || address.town || address.village || "Unknown City",
              state: address.state || "Unknown State",
              country: address.country || "Unknown Country",
            });
          } catch {
            setError("Error fetching location.");
          }
        },
        () => setError("Geolocation permission denied.")
      );
    }, []);
/* This `useEffect` hook is responsible for fetching the current geolocation coordinates of the user.
Here's a breakdown of what it's doing: */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

/**
 * This useEffect hook fetches weather forecast data based on the provided location coordinates using
 * an API call and updates the state with the fetched data.
 * @returns In the `useEffect` hook provided, a function `fetchData` is defined to asynchronously fetch
 * weather forecast data from the Open Meteo API based on the provided `location` (latitude and
 * longitude). If `location` is not available, the function returns early without making the API call.
 * If the API call is successful, the retrieved data is stored using the `setData` function. If an
 */
  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;

      try {
        const { data } = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=temperature_2m,weathercode`
        );
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <>
      /* This part of the code in the `App` component is setting up the routing for different pages in
      the React application using React Router. Here's a breakdown of what it's doing: */
      <Navbar />
      <Routes>
        <Route path='/' element={<Container data={data} weatherCodes={weatherCodes} location={address} error={error} />}/>
        <Route path='/Hourly' element={<Hourly data={data}/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Daily' element={<Daily/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
