import React, { Component } from "react";
import Form from "../../components/Form/Form";

import { cardData } from "../../config";

class StripeDonationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "",
      cardNumber: "",
      cvv: ""
    };
  }

  onChangeHander = event => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  render() {
    console.log("Stripe Form: ", this.state);
    return (
      <Form
        name="Donations"
        data={cardData}
        onChange={this.onChangeHander}
        state={this.state}
      />
    );
  }
}

export default StripeDonationForm;
