import React, { Component } from "react";
import Form from "../../components/Form/Form";

import { cardData } from "../../config";
import styles from "./StripeDonationForm.css";

import { donationData } from "./StripeFormDonation.config";

class StripeDonationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "",
      cardNumber: "",
      cvv: "",
      expiration: "",
      amount: "0.00"
    };
  }

  onChangeHander = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      switch (name) {
        case "expiration":
          return this.setState({ ...this.state, ...this.formatDate(name) });
        case "amount":
          return this.setState({ ...this.state, ...this.formatAmount(name) });
        default:
          return;
      }
    });
  };

  formatDate = name => {
    let expiration = this.state[name]
      .split("")
      .filter(character => !isNaN(character))
      .join("");

    if (expiration.includes("/"))
      expiration = this.state[name].split("/").join("");
    const newExpiration = expiration;
    if (expiration.length > 2) {
      const month = expiration.substr(0, 2);
      const year = expiration.substr(2, 4);
      const newExpiration = `${month}/${year}`;
      return { expiration: newExpiration };
    }
    return {
      expiration: newExpiration
    };
  };

  formatAmount = name => {
    let amount = this.state[name]
      .split("")
      .filter(char => !isNaN(char))
      .join("")
      .split(".")
      .join("");

    if (parseInt(amount, 10) === 0) amount = "000";

    if (amount.length < 3) amount = "0" + amount;

    while (amount.startsWith("0") && amount.length > 3) {
      amount = amount.substring(1);
    }
    const integer = amount.substring(0, amount.length - 2);
    const decimal = amount.substring(amount.length - 2);
    let formattedAmount = `${integer}.${decimal}`;

    return {
      amount: formattedAmount
    };
  };

  render() {
    return (
      <div className={styles.StripeDonationForm}>
        <div>
          <section>{donationData.description}</section>
          <Form
            name={donationData.name}
            data={cardData}
            onChange={this.onChangeHander}
            state={this.state}
          />
        </div>
      </div>
    );
  }
}

export default StripeDonationForm;
