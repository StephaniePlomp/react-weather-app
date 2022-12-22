import { useState, useEffect } from "react";
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import SearchLocation from './components/search/SearchLocation';
import Forecast from "./components/forecast/Forecast";
import getFormattedWeatherData from "./api";
import Time from "./components/time/Time";
import HourlyForecast from "./components/hourly-forecast/HourlyForecast";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({ q: 'New York' })
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {   
      await getFormattedWeatherData({ ...query, units })
        .then((data) => {
          toast.success(
            `Succesfully fetched weather for ${data.name},  ${data.country}.`
          );
          setWeather(data);
        });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="container">
      <div className="cloud"></div>
      <div className="intro">
        <h1>React Weather App</h1>
      </div>
      <div className="search">
        <SearchLocation setQuery={setQuery} />
      </div>
      
      <div className="dashboard">
        {weather && (
          <>
            <CurrentWeather weather={weather} />
            <Time weather={weather} units={units} setUnits={setUnits} />
            <HourlyForecast items={weather.hourly} />
            <Forecast items={weather.daily} />
          </>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          transition={Zoom}
        />
      </div>
    </div>

  );
}

export default App;
