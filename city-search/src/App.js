import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipCodes: []
    };
  }

  updateCity = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchCityData = zip => {
    console.log("this is the city:", zip);
    axios.get(`http://ctp-zip-api.herokuapp.com/zip/${zip}`).then(res =>
      this.setState({
        cities: res.data
      })
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchZipData(this.state.zipCode);
  };

  showCities = () => {
    return (
      <div>
        {this.state.cities.map(city => (
          <div className="cityCard">
            <div className="cityName">{city.City}</div>
            <div className="cityInfo">
              <div>State: {city.State}</div>
              <div>
                Location: ({city.Lat}, {city.Long})
              </div>
              <div>Population (estimated): {city.EstimatedPopulation}</div>
              <div>Total Wages: {city.TotalWages}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="searchHeader">Zipcode Search</div>
        <br />
        <div className="searchBox">
          <Form className="form" inline>
            <FormGroup>
              <Label for="zipCode">Zip Code: </Label>
              <Input type="number" name="zipCode" onChange={this.updateZip} />
              <Input type="submit" value="Search" onClick={this.handleSubmit} />
            </FormGroup>
          </Form>
        </div>

        <div className="searchResults">{this.showCities()}</div>
      </div>
    );
  }
}

export default App;
