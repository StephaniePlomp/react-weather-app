import React from "react";

function HourlyForecast({ items }) {
  console.log(items);
  
  return (    
<>
  <div className="forecast">
    <div className="top">
      <label className="title">Hourly Forecast</label>
    </div>
      <hr className="daily-item-line"/>
  
  {items.map((item, index) => (
    <>
    <div className="hourly-item">
    <p>{item.title}</p>
    <img src={`icons/${item.icon}.png`} className="icon-small" alt="weather" />
    <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
    </div>
    <hr className="daily-item-line"/>
    </>
  ))}

</div>
</>

);
}

export default HourlyForecast;
