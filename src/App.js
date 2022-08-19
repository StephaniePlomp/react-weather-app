import { useState, useEffect } from "react";
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import SearchLocation from './components/search/SearchLocation';
import Forecast from "./components/forecast/Forecast";
import getFormattedWeatherData from "./api";
import Time from "./components/time/Time";
import HourlyForecast from "./components/hourly-forecast/HourlyForecast";

function App() {

  const [query, setQuery] = useState({ q: '' })
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units })
        .then((data) => {
          setWeather(data);
        });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="container">
      <div className="intro">
        <h1>The Weather App</h1>
      </div>
      <div className="search">
        <SearchLocation setQuery={setQuery} />
      </div>
      {weather && (
        <div className="date"><Time weather={weather} units={units} setUnits={setUnits} /></div>
      )}
      <div className="dashboard">
        {weather && (
          <>
            <CurrentWeather weather={weather} />
            <HourlyForecast items={weather.hourly}/>
            <Forecast items={weather.daily} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
