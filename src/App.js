import React, { Component } from "react";
import "./App.css";

import StripeDonationForm from "./containers/StripeDonationForm/StripeDonationForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <StripeDonationForm />
      </div>
    );
  }
}

export default App;
