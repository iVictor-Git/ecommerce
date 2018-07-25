import React from "react";

const Input = props => {
  const generateInputElement = () => {
    switch (props.element) {
      case "textarea":
        return <textarea {...props} />;
      default:
        return <input {...props} />;
    }
  };

  const element = generateInputElement();
  console.log("input: ", props.value);

  return (
    <div>
      <label htmlFor={props.id}>
        {props.field}: {element}
      </label>
    </div>
  );
};

export default Input;
