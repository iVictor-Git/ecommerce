import React from "react";
import Input from "./Input/Input";

import styles from "./Form.css";

const Form = props => {
  const elements = props.data.map(input => {
    return (
      <Input
        key={input.id}
        {...input}
        onChange={event => props.onChange(event)}
        value={props.state[input.name]}
      />
    );
  });
  return (
    <form className={styles.Form}>
      <fieldset>
        <legend>{props.name} </legend>
        <div>{elements}</div>
        <input type="submit" value="Donate" />
      </fieldset>
    </form>
  );
};

export default Form;
