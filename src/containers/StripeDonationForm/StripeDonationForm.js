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
      amount: ""
    };
  }

  onChangeHander = event => {
    const { name, value } = event.target;
    this.setState(
      {
        ...this.state,
        [name]: value
      },
      () => {
        this.formatDate();
      }
    );
  };

  formatDate = () => {
    this.setState(prevState => {
      let joinedExpiration = prevState.expiration;
      if (prevState.expiration.includes("/")) {
        joinedExpiration = prevState.expiration.split("/").join("");
      }
      const newExpiration = joinedExpiration;
      console.log(joinedExpiration.length > 2);
      if (joinedExpiration.length > 2) {
        const month = joinedExpiration.substr(0, 2);
        const year = joinedExpiration.substr(2, 4);
        const newExpiration = `${month}/${year}`;
        return { expiration: newExpiration };
      }
      return {
        expiration: newExpiration
      };
    });
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
