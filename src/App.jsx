import React from 'react'
import { useState } from 'react'
import axios from "axios";


const App = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (city.trim().length < 3) {
    setError("Please enter full city name❗");
    setWeather(null);
    return;
  }

  

  try {
    setLoading(true);
    setError("");
    const res = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: {
          key: import.meta.env.VITE_WEATHER_API_KEY,
          q: city,
        },
      }
    );

    setWeather(res.data);

  } catch (error) {
    setError("City not found ❌");
    setWeather(null);

  }finally{
    setLoading(false);
  }

  
};
const getBgClass = () => {
    if (!weather) {
      return "bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-600";
    }

    const condition = weather.current.condition.text.toLowerCase();

    if (condition.includes("sun")) {
      return "bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400";
    }
    if (condition.includes("cloud")) {
      return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500";
    }
    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900";
    }
    if (condition.includes("snow")) {
      return "bg-gradient-to-br from-slate-100 via-sky-200 to-blue-300";
    }
    if (condition.includes("mist") || condition.includes("fog")) {
      return "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400";
    }

    return "bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-600";
  };

  return (
    
    <div className={`min-h-screen p-4 ${getBgClass()} flex justify-center items-center`}>
      <div className='w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center'>
      <h1 className='text-4xl font-extrabold text-gray-800 mb-6'>Weather App 🌦️</h1>
      <div className='flex gap-4 mb-6'>
      <input 
      className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 "
      value={city}  
      type="text" 
      placeholder='Enter city name'
      onChange={(e) => setCity(e.target.value)}/>
      <button
      onClick={fetchWeather}
       className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 transition-all ">
        Go
        </button>
       
       </div>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {weather && (
  <div className="mt-4 text-gray-700">
    <h2 className="text-2xl font-bold">
      {weather.location.name}
    </h2>
    <p className="text-xl">
      {weather.current.temp_c} °C
    </p>
  </div>
)}

    </div>
    </div>
  )
}

export default App
