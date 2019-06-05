import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: 10025,
      cities: []
    };
  }

  updateZip = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchZipData = zip => {
    console.log("this is the zip:", zip);
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
          <div className="city">
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
        <div className="searchHeader">Header</div>
        <div className="searchBox">
          <form>
            <label for="zipCode">Zip Code:</label>
            <input type="number" name="zipCode" onChange={this.updateZip} />
            <input type="submit" value="Search" onClick={this.handleSubmit} />
          </form>
        </div>
        <div className="searchResults">{this.showCities()}</div>
      </div>
    );
  }
}

export default App;
