import React from 'react';
import { objectOf, any } from 'prop-types';
import Day from '../Day/Day';
import './Forecast.css';

const Forecast = props => (
  <div className="forecast-container">
    <div className="container">
      <div className="row">
        {props.forecastData.list.map(day => <Day dayData={day} key={day.dt} />)}
      </div>
    </div>
  </div>
);

Forecast.propTypes = {
  forecastData: objectOf(any).isRequired
};

export default Forecast;
