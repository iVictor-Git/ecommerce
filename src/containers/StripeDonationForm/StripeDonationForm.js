import React, { Component } from "react";
import Form from "../../components/Form/Form";

import styles from "./StripeDonationForm.css";

import { donationData, cardData } from "./StripeFormDonation.config";

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
      card: {
        name: {
          value: "",
          error: false,
          errorMessage: ""
        },
        number: {
          value: "",
          error: false,
          errorMessage: ""
        },
        expiration: {
          value: "",
          error: false,
          errorMessage: ""
        },
        cvv: {
          value: "",
          error: false,
          errorMessage: ""
        },
        amount: {
          value: "0.00",
          error: false,
          errorMessage: ""
        },
        valid: {
          value: "",
          error: false,
          errorMessage: ""
        },
        type: {
          value: "",
          error: false,
          errorMessage: ""
        }
      }
    };
  }

  ReadyTheState = (name, fn) => {
    const card = { ...this.state.card };
    card[name] = fn(name);
    return card;
  };

  ChangeTheState = name => {
    this.setState({
      card: {
        ...name
      }
    });
  };

  FormatState = (name, fn) => {
    this.ChangeTheState(this.ReadyTheState(name, fn));
  };

  onChangeHander = event => {
    const { name, value } = event.target;
    const state = {
      ...this.state.card,
      [name]: {
        ...this.state.card[name],
        value
      }
    };

    this.setState(
      {
        card: { ...state }
      },
      () => {
        switch (name) {
          case "expiration":
            return this.FormatState(name, () => this.formatDate(name));
          case "amount":
            return this.FormatState(name, () => this.formatAmount(name));
          case "cvv":
            return this.FormatState(name, () => this.formatNumbersOnly(name));
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
      }
    );
  };

  formatDate = name => {
    let expiration = { ...this.state.card[name] };
    expiration.value = retrieveOnlyNumbers(expiration.value);

    let newExpiration = expiration.value;
    if (newExpiration.length > 2) {
      const month = newExpiration.substr(0, 2);
      const year = newExpiration.substr(2, 4);
      newExpiration = `${month}/${year}`;
      expiration.value = newExpiration;
      return { ...expiration };
    }
    return {
      ...expiration
    };
  };

  formatNumbersOnly = name => {
    const card = this.state.card[name];
    const value = retrieveOnlyNumbers(this.state.card[name].value);
    card.value = value;
    console.log(card);
    return { ...card };
  };

  formatAmount = name => {
    const card = this.state.card[name];
    console.log(card);
    let amount = retrieveOnlyNumbers(this.state.card[name].value);

    if (parseInt(amount, 10) === 0 || !amount.length) amount = "000";

    while (amount.startsWith("0") && amount.length > 2) {
      amount = amount.substring(1);
    }
    if (amount.length <= 2) amount = "0" + amount;
    const integer = amount.substring(0, amount.length - 2);
    const decimal = amount.substring(amount.length - 2);
    const formattedAmount = `${integer}.${decimal}`;
    card.value = formattedAmount;
    console.log(card);
    return {
      ...card
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
            state={this.state.card}
          />
        </div>
      </div>
    );
  }
}

export default StripeDonationForm;
