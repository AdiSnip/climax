import React, { useMemo } from 'react';

const weatherCodes = {
  clear: [0, 1], // Clear sky, Mainly clear
  cloudy: [2, 3, 45, 48], // Partly cloudy, Overcast, Fog, Rime fog
  rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], // Drizzle, Rain, Freezing rain, Showers
  thunder: [95, 96, 99] // Thunderstorms with/without hail
};

const getWeatherType = (code) => {
  return Object.keys(weatherCodes).find((type) => weatherCodes[type].includes(code)) || "unknown";
};

const Hourly = ({ data }) => {
  if (!data?.hourly?.temperature_2m) return null;

  const arrdata = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      time: i,
      weathercode: data.hourly.weathercode[i],
      png: `/Icons/${getWeatherType(data.hourly.weathercode[i])}.png`,
      description: getWeatherType(data.hourly.weathercode[i]),
      temperature: data.hourly.temperature_2m[i]
    }));
  }, [data]);

  return (
    <div className="overflow-y-auto overflow-x-auto w-full z-1 pt-[20vh] bg-red-400 text-[1vw] hide-scrollbar flex justify-center touch-pan-y">
      <div className='absolute top-[10vh] h-[10vh] text-[5vw] font-bold text-white'>Hourly Weather</div>
      <div className="flex flex-col items-center w-[90%]">
        {arrdata.map((term, i) => (
          <div key={i} className="w-[100%] h-[20vh] rounded-[2vw] m-[2vw] flex items-center bg-white border border-amber-50 backdrop-blur-2xl hover:bg-white shrink-0">
            <p className="w-full h-[20%] lg:text-[2vw] text-[5vw] flex items-center justify-center">{term.time}:00</p>
            <img src={term.png} alt={term.description} className="lg:w-[10%] w-[20%]" />
            <p className="w-full h-[20%] lg:text-[2vw] text-[5vw] flex items-center justify-center">{term.description}</p>
            <p className="w-full h-[20%] lg:text-[2vw] text-[4vw] font-extrabold flex items-center justify-center">{term.temperature}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hourly;

