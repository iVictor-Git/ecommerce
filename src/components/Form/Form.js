import React from "react";
import Input from "./Input/Input";

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
    <form>
      <fieldset>
        <legend>{props.name}: </legend>
        {elements}
        <input type="submit" value="submit" />
      </fieldset>
    </form>
  );
};

export default Form;
