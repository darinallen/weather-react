import React from 'react';
import { objectOf, any } from 'prop-types';
import './Current.css';

const Current = props => (
  <div className="current-container">
    <h3>Weather in {props.currentData.name}</h3>
    <div>
      <img
        className="temp icon"
        src={`http://openweathermap.org/img/w/${props.currentData.weather[0].icon}.png`}
        alt="Weather Icon"
      />
      <h1 className="temp">{Math.round(props.currentData.main.temp)}°</h1>
    </div>
    <h4 className="current-description">{props.currentData.weather[0].description}</h4>
  </div>
);

Current.propTypes = {
  currentData: objectOf(any).isRequired
};

export default Current;
