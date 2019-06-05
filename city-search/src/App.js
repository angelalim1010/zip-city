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

const INITIAL_STATE = {
  city: "",
  zipCodes: [],
  cities: [],
  states: []
};

class App extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  updateCity = e => {
    const city = document.getElementById("city");
    city.value = city.value.toUpperCase();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchZipCodes = async city => {
    try {
      let res = await axios.get(
        `http://ctp-zip-api.herokuapp.com/city/${city}`
      );
      this.setState({
        zipCodes: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  fetchCitiesFillStates = async zip => {
    try {
      this.setState({ cities: [] });
      let res = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${zip}`);
      this.setState({
        cities: res.data
      });
      for (let city of this.state.cities) {
        await this.filterStates(city);
      }
    } catch (err) {
      console.log(err);
    }
  };

  filterStates = city => {
    try {
      console.log("Current states: ", this.state.states);
      if (this.state.states.indexOf(city.State) === -1) {
        this.setState(state => {
          const states = state.states.concat(city.State);
          return { states };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  filterStatesWithCity = async city => {
    await this.fetchZipCodes(city);
    for (let zip of this.state.zipCodes) {
      await this.fetchCitiesFillStates(zip);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.filterStatesWithCity(this.state.city);
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
