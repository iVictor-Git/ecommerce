import React, { Component } from "react";
import Form from "../../components/Form/Form";

import { cardData } from "../../config";
import styles from "./StripeDonationForm.css";

import { donationData } from "./StripeFormDonation.config";

import { retrieveOnlyNumbers } from "../../functions/retrieveOnlyNumbers";

// TODOs:
// 1. reject non-numeric in card number
// 2. Depending on card type
//    3. Determine card type
//      4. Validate card number
// 4. Space according numbers according to card type

class StripeDonationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "",
      cardNumber: "",
      cvv: "",
      expiration: "",
      amount: "0.00",
      validCard: true,
      cardType: ""
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
        case "cvv":
          return this.setState({
            ...this.state,
            ...this.formatNumbersOnly(name)
          });
        case "cardNumber":
          return this.setState(
            {
              ...this.state,
              ...this.formatNumbersOnly(name)
            },
            () => {
              this.setState({
                ...this.state,
                validCard:
                  this.state.cardNumber.length > 12
                    ? this.validateCreditCard(this.state.cardNumber)
                    : false,
                cardType:
                  this.state.cardNumber.length > 2
                    ? this.determineCardType()
                    : null
              });
            }
          );
        default:
          return;
      }
    });
  };

  formatDate = name => {
    let expiration = retrieveOnlyNumbers(this.state[name]);

    let newExpiration = expiration;
    if (expiration.length > 2) {
      const month = expiration.substr(0, 2);
      const year = expiration.substr(2, 4);
      newExpiration = `${month}/${year}`;
      return { expiration: newExpiration };
    }
    return {
      expiration: newExpiration
    };
  };

  formatNumbersOnly = name => {
    let state = retrieveOnlyNumbers(this.state[name]);
    return { [name]: state };
  };

  formatAmount = name => {
    let amount = retrieveOnlyNumbers(this.state[name]);

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

  determineCardType = () => {};

  onSubmitHandler = event => {
    event.preventDefault();
    console.log(`You've submitted the following information:`);
    Object.keys(this.state).forEach(state => {
      console.log(`${state}: ${this.state[state]}`);
    });
  };

  validateCreditCard = value => {
    let nCheck = 0,
      // nCheck => numberCheck
      nDigit = 0,
      // nDigit => numberDigit
      bEven = false;
    // bEven => booleanEven
    value = value.replace(/\D/g, ""); // regex matching non-digit characters => [^0-9] for entire string

    for (let n = value.length - 1; n >= 0; n--) {
      // loops from n, starting at string length - 1 => 0
      // 6, 5, 4, 3, 2, 1, 0
      let cDigit = value.charAt(n);
      // characterDigit => is the character at whatever index per above
      nDigit = parseInt(cDigit, 10);
      // numberDigit is reassigned to an int base 10 using cdigit

      if (bEven) {
        // skipped first iteration, active next iteration, then skipped, etc...
        if ((nDigit *= 2) > 9) {
          // logic here is if number is 5 => 5 * 2 => 10 => 10 - 9 => 1
          // 6 * 2 => 12 => 12 - 9 => 3
          // 7 * 2 => 14 => 12 - 9 => 5
          nDigit -= 9;
        }
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 === 0;
  };

  render() {
    return (
      <div className={styles.StripeDonationForm}>
        <div>
          <section>{donationData.description}</section>
          <Form
            onSubmit={this.onSubmitHandler}
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
