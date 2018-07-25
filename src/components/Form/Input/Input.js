import React from "react";
import styles from "./Input.css";

const Input = props => {
  const generateInputElement = () => {
    switch (props.element) {
      case "textarea":
        return <textarea {...props} />;
      default:
        return <input {...props} maxLength={props.name === "cvv" ? 3 : 16} />;
    }
  };

  const element = generateInputElement();
  console.log("input: ", props.value);

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id}>{props.field}:</label>
      {element}
    </div>
  );
};

export default Input;
