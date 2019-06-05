import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="searchHeader">Header</div>
      <div className="searchBox">
        <form>
          <label for="zipCode">Zip Code:</label>
          <input type="number" name="zipCode" />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>
  );
}

export default App;
