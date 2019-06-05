import React, { Component } from 'react';
import logo from "./logo.svg";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import "./App.css";

class App extends Component {
    render(){
        return (
          <div className="App">
            <div className="searchHeader">Zipcode Search</div>
            <br></br>
            <div className="searchBox">
              <Form className="form" inline>
                <FormGroup>
                    <Label for="zipCode">Zip Code: </Label>
                    <Input type="number" name="zipCode" />
                    <Input type="submit" value="Search" />
                </FormGroup>
              </Form>
            </div>
          </div>
        );
      }
    }

export default App;
