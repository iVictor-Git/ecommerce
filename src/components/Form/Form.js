import React from "react";
import Input from "./Input/Input";

import styles from "./Form.css";

const Form = props => {
  console.log("Form", props.state);
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
        <legend>{props.name}: </legend>
        {elements}
        <input type="submit" value="Donate" />
      </fieldset>
    </form>
  );
};

export default Form;
