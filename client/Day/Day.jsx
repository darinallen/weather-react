import React from 'react';
import { objectOf, any } from 'prop-types';
import './Day.css';

const Day = props => {
  const timestamp = props.dayData.dt;
  const a = new Date(timestamp * 1000);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = days[a.getDay()];

  return (
    <div className="col-xs-12 col-sm-2">
      <div className="day-container">
        <div className="day-content">
          <h5>{dayOfWeek}</h5>
          <img
            className="icon"
            src={`https://openweathermap.org/img/w/${props.dayData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <h5>
            <span className="low">{Math.round(props.dayData.temp.min)}°</span>{' / '}
            <span className="high">{Math.round(props.dayData.temp.max)}°</span>
          </h5>
          <h5 className="day-description">{props.dayData.weather[0].description}</h5>
        </div>
      </div>
    </div>
  );
};

Day.propTypes = {
  dayData: objectOf(any).isRequired
};

export default Day;
