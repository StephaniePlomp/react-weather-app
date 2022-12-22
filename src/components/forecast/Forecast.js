import React from "react";
import "./forecast.css";


function Forecast({ items }) {
  
  return (    
<>
  <div className="forecast">
    <div className="top">
      <label className="title">Daily Forecast</label>
    </div>
      <hr className="daily-item-line"/>
  
  {items.map((item, index) => (
    <div className="forecast-wrapper" key={index}>
    <div className="daily-item">
    <p className="day-title">{item.title}</p>
    <img src={process.env.PUBLIC_URL + `/assets/icons/${item.icon}.png`} className="icon-small" alt="weather" />
    <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
    </div>
    <hr className="daily-item-line"/>
    </div>
  ))}

</div>
</>

);
}

export default Forecast;