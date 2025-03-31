import React, { useState, useEffect, useCallback, useMemo } from "react";
import Hourly from "../Pages/Hourly";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import Currentweather from "./Currentweather";
import WeatherReport from "./WeatherReport";

const Container = ({ data, weatherCodes, location, error }) => {
  const [countryIso, setCountryIso] = useState("");
  const [stateIso, setStateIso] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("")
  const [report, setReport] = useState(false)
  const [reportdata, setReportdata] = useState(null)

  // Fetch all countries once when the component mounts
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Fetch states when countryIso changes
  useEffect(() => {
    setStates(countryIso ? State.getStatesOfCountry(countryIso) || [] : []);
  }, [countryIso]);

  // Fetch cities when stateIso changes
  useEffect(() => {
    setCities(countryIso && stateIso ? City.getCitiesOfState(countryIso, stateIso) || [] : []);
  }, [stateIso]);

  // Optimized handlers with useCallback to prevent unnecessary re-renders
  const handleCountryChange = useCallback((e) => {
    const selectedCountry = countries.find(country => country.name === e.target.value);
    setCountryIso(selectedCountry?.isoCode || "");
    setStateIso(""); // Reset state selection when country changes
  }, [countries]);

  const handleStateChange = useCallback((e) => {
    const selectedState = states.find(state => state.name === e.target.value);
    setStateIso(selectedState?.isoCode || "");
  }, [states]);

  const handleCityChange = useCallback((e) => {
    setSelectedCity(cities.find(city => city.name === e.target.value));
  }, [cities]);

  const btnclicked = async (e)=>{
    e.preventDefault();
    if (!selectedCity) return;

      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current_weather=true&hourly=temperature_2m,weathercode`
        );
        if(report){
          setReport(false)
        }else{
          setReport(true)
        }
        setReportdata(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }
  return (
    <div className="h-[130vh] md:h-[140vh] lg:h-[100vh] overflow-hidden bg-sky-600 relative ">
      <div className="lg:pt-[20vh] pt-[40vh] absolute top-0 z-1 flex lg:h-[100%] h-[100vh] w-full text-white">
        <div className="lg:w-[50%] w-[100%] pl-[2%] pt-[1%]">
          <h1 className="lg:text-[4vw] text-[10vw] lg:font-normal font-bold lg:tracking-widest tracking-normal">KNOW WEATHER</h1>
          <p className="lg:w-1/2 w-full lg:text-[1.5vw] text-[5vw] font-bold lg:mt-[6vh] mt-[2vh]">You can search for weather conditions in your area.</p>
          <p className="lg:w-1/2 lg:mt-[3vh] w-full">Weather is used to know conditions of your area you can easily check weather conditions</p>
          <form className="w-[80%] h-[8vh] mt-[5%] rounded-l-3xl rounded-r-3xl bg-sky-600 lg:flex justify-center items-center lg:flex-row flex-col">
            {/* Country Selection */}
            <input
              list="country"
              placeholder="Enter country"
              onChange={handleCountryChange}
              className="lg:w-1/3 w-[90vw] lg:rounded-[0px] rounded-3xl bg-white lg:rounded-l-3xl text-black h-full border px-2"
            />
            <datalist id="country" className="absolute left-0 ">
              <option value="">Select a country</option>
              {countries.map((country, i) => (
                <option key={i} value={country.name}>{country.name}</option>
              ))}
            </datalist>

            {/* State Selection */}
            <input
              list="state"
              placeholder="Enter state"
              onChange={handleStateChange}
              className="lg:w-1/3 w-[90vw] lg:mt-0 mt-5 lg:rounded-[0px] rounded-3xl bg-white text-black h-full border px-2"
              disabled={!countryIso}
            />
            <datalist id="state">
              {states.map((state, i) => (
                <option key={i} value={state.name}>{state.name}</option>
              ))}
            </datalist>

            {/* City Selection */}
            <input
              list="city"
              placeholder="Enter city"
              onChange={handleCityChange}
              className="lg:w-1/3 w-[90vw] lg:mt-0 mt-5 lg:rounded-[0px] rounded-3xl bg-white text-black h-full border px-2"
              disabled={!stateIso}
            />
            <datalist id="city">
              {cities.map((city, i) => (
                <option key={i} value={city.name}>{city.name}</option>
              ))}
            </datalist>
            {/* Search Button */}
            <button onClick={btnclicked} className="h-full lg:w-[10vw] w-[90vw] lg:mt-0 mt-5 lg:rounded-r-3xl lg:rounded-[0px] rounded-3xl bg-red-400 p-[0.7vw] text-white lg:text-[1vw] text-3xl font-extrabold flex items-center justify-center cursor-pointer rounded-r-3xl transition-colors duration-200 origin-bottom-left hover:bg-black hover:text-red-400">
              Search
            </button>
          </form>
        </div>
        <Currentweather data={data} weatherCodes={weatherCodes} location={location} error={error}/>
      </div>
      <WeatherReport btnclicked={btnclicked} report={report} reportdata={reportdata}/>
    </div>
  );
};

export default Container;
