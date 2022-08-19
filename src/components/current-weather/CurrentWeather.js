import React from "react";
import "./current-weather.css";

function CurrentWeather({
  weather: {
    country,
    name,
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{`${name}, ${country}`}</p>
          <p className="weather-description">{details}</p>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${icon}.png`}
        />
        </div>
        
      </div>
      <div className="bottom">
        <p className="temperature">{`${temp.toFixed()}°`}</p> 
      </div>  
    <hr className="details-line"/>
    <div className="right">
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
            {`${feels_like.toFixed()}°`}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{`${speed.toFixed()} km/h`}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{`${humidity.toFixed()}%`}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;