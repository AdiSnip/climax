import React, { useEffect, useState } from "react";


const Currentweather = ({ data, weatherCodes, location, error}) => {
  const [temp, setTemp] = useState("");
  const [weatherType, setWeatherType] = useState("unknown");
  // const [location, setLocation] = useState({
  //   city: "Unknown City",
  //   state: "Unknown State",
  //   country: "Unknown Country",
  // });
  // const [error, setError] = useState("");


  const getWeatherType = (code) => {
    for (const [type, codes] of Object.entries(weatherCodes)) {
      if (codes.includes(code)) return type;
    }
    return "unknown";
  };
  // Fetch Weather Data
  useEffect(() => {
    if (!data) return;
    setTemp(`${Math.floor(data.current_weather.temperature)}°C`);
    setWeatherType(getWeatherType(data.current_weather.weathercode));
  }, [data]); // ✅ Depend on `data` to avoid unnecessary re-renders

  // Get User Location
  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     setError("Geolocation is not supported by this browser.");
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       try {
  //         const { latitude, longitude } = position.coords;
  //         const response = await fetch(
  //           `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  //         );
  //         const result = await response.json();
  //         const address = result.address || {};
  //         setLocation({
  //           city: address.city || address.town || address.village || "Unknown City",
  //           state: address.state || "Unknown State",
  //           country: address.country || "Unknown Country",
  //         });
  //       } catch {
  //         setError("Error fetching location.");
  //       }
  //     },
  //     () => setError("Geolocation permission denied.")
  //   );
  // }, []); // ✅ Runs once on mount

  return (
    <div className="lg:w-[50vw] lg:h-full lg:left-1/2 left-0 h-[40vh] w-full top-0 bg-red-400 flex justify-center items-center absolute">
      <div className="lg:w-[20vw] w-[100%] h-[22vw] lg:scale-150 scale-100 absolute lg:top-[25vh] top-[12vh] p-2">
        {/* Temperature & Weather Icon */}
        <div className="w-full h-[60%] lg:relative absolute top-0">
          <div className="w-full h-[40%] lg:pl-[55%] pl-[80%] lg:pt-[5vh] lg:text-[3vw] text-[8vw]">{temp}</div>
          <div className="w-full h-[70%]">
            <img
              className="lg:h-full lg:scale-180 lg:relative lg:ml-[3vw] lg:mt-[8vh] lg:bottom-[6vh] scale-110 right-0 absolute mt-[1vh] max-h-[200px] "
              src={`./Icons/${weatherType}.png`} // 🔹 Ensure the correct path for deployment
              alt="Weather condition"
            />
          </div>
        </div>

        {/* Location & Weather Description */}
        <div className="pl-[1vw] relative lg:bottom-[1vh] bottom-[1vh] lg:font-medium font-light leading-[4vh] lg:mt-[5vh]">
          <div className="lg:w-full w-[70%] italic lg:text-[1vw] lg:mt-0 mt-[2vh] text-[6vw]">
            {location.city}, {location.state}, {location.country}
          </div>
          <div className="font-bold lg:text-[2vw] lg:mt-0 mt-[3vh] text-[8vw] capitalize">{weatherType}</div>
        </div>

        {/* Error Message (if any) */}
        {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Currentweather;
