import React, { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion';
import './hourly-forecast.css'

function HourlyForecast({ items }) {
  const [width, setWidth] = useState(0)
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, []);

  return (

    <div className="HourlyForecast">
      <div className="hourly-container">

        <div className="top">
          <label className="title">Hourly Forecast</label>
        </div>
        <hr className="daily-item-line" />
        <motion.div ref={carousel} className="carousel" whileTap={{ cursor: "grabbing" }}>
          <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel">
            {items.map((item, index) => {
              return (
                <motion.div className="hourly-item" key={index}>
                  <p>{item.title}</p>
                  <img src={process.env.PUBLIC_URL + `/assets/icons/${item.icon}.png`} className="icon-hourly" alt="weather" />
                  <p className="font-temp">{`${item.temp.toFixed()}°`}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default HourlyForecast;
