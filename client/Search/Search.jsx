import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import { string, func } from 'prop-types';
import './Search.css';

const Search = props => (
  <div className="search-container">
    <div className="search-content">
      <Form onSubmit={props.getWeatherByZip} className="zip-form" inline>
        <FormGroup className="zip-entry" controlId="formInlineZip">
          <FormControl
            onChange={props.handleZipEntry}
            value={props.zip}
            className="zip-entry-text"
            type="text"
            placeholder="Enter zip code"
          />
        </FormGroup>
        {' '}
        <Button bsStyle="primary" className="zip-button" type="submit">
          Submit
        </Button>
      </Form>
      <p>OR</p>
      <Button className="location-button" onClick={props.getWeatherByGeo}>Search By Current Location</Button>
    </div>
  </div>
);

Search.propTypes = {
  getWeatherByZip: func.isRequired,
  getWeatherByGeo: func.isRequired,
  handleZipEntry: func.isRequired,
  zip: string.isRequired
};

export default Search;
