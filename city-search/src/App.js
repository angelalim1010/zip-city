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
import { fetchZipData } from "../../zip-search/src/App";

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipCodes: [],
      cities: [],
      states: [],
      validZip: true
    };
  }

  updateCity = e => {
    const city = document.getElementById("city");
    city.value = city.value.toUpperCase();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchCityData = city => {
    console.log("this is the city:", city);
    axios.get(`http://ctp-zip-api.herokuapp.com/city/${city}`).then(res =>
      this.setState({
        zipCodes: res.data
      })
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchCityData(this.state.city);
  };

  showCities = () => {
    return (
      <div className="zipCodes">
        {this.state.zipCodes.map((zipCode, index) => (
          <div className="zipCode" key={index}>
            {zipCode}
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="searchHeader">City Search</div>
        <br />
        <div className="searchBox">
          <Form className="form" inline>
            <FormGroup>
              <Label for="city">City: </Label>
              <Input
                type="text"
                id="city"
                name="city"
                onChange={this.updateCity}
              />
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
