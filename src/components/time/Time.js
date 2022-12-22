import React from "react";
import { formatToLocalTime, formatToLocalDate } from "../../api";

function TimeAndLocation({ weather: { dt, timezone }, units, setUnits }) {

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  return (
    <div>
      <div className="time-container">
        <p className="date">{formatToLocalDate(dt,timezone)}</p>
        <p className="date">{formatToLocalTime(dt,timezone)}
        </p>
     
        <div className="unit-container">
        <button
          name="metric"
          className="btn-handle-unit"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p>|</p>
        <button
          name="imperial"
          className="btn-handle-unit"
          onClick={handleUnitsChange}
        > °F
        </button>
        </div> 
      </div>
    </div>
  );
}
export default TimeAndLocation;