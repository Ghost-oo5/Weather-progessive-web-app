import React, { useState } from "react";
import "./App.css";
import { fetchWeather } from "./api/fetchWeather";
import { WeatherResponse } from "./Types/types";
import { BiCloud, BiSun } from "react-icons/bi";
import { BsDroplet } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";

function App() {
  const [query, setquery] = useState("");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      console.log(data);
      setquery("");
    }
  };
  return (
    <>
      <div className="main-container">
        <input
        
          type="text"
          className="search p-2 rounded-lg"
          placeholder="Search..."
          value={query}
          onChange={(e) => setquery(e.target.value)}
          onKeyPress={search}
        />
        <div className="weather mt-10">
          {weather && (
            <div className="max-w-sm p-6 bg-white border flex flex-col pt-16 items-start justify-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="w-full items-center justify-center flex flex-col">
                <div className="flex mb-5">
                  <a href="#">
                    <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {weather.name}
                    </h5>
                  </a>
                  <sup>
                      {weather.sys.country}
                    </sup>
                </div>
                <div className="flex justify-between w-full">
                
                  <p className="mb-3 font-normal items-center flex text-gray-500 dark:text-gray-400">
                    <FaTemperatureHigh className="mr-1"/>
                   Temprature: {weather.main.temp} <sup>&deg;</sup>
                  </p>
                  <p className="mb-3 font-normal items-center flex text-gray-500 dark:text-gray-400">
                    <BsDroplet className="mr-1"/>
                   humidity: {weather.main.humidity}
                  </p>
                </div>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                   Feels like: {weather.main.feels_like}
                  </p>
                  <div className="info">
                  <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
