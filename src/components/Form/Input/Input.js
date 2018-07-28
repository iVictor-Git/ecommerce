import React from "react";
import styles from "./Input.css";

const Input = props => {
  const ErrorStyle = {
    border: "2px solid red",
    outlineColor: "red",
    borderRadius: 0
  };

  const generateInputElement = () => {
    switch (props.element) {
      case "textarea":
        return <textarea {...props} />;
      default:
        return (
          <input {...props} style={props.error ? { ...ErrorStyle } : null} />
        );
    }
  };

  const element = generateInputElement();

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id}>{props.field}:</label>
      {element}
    </div>
  );
};

export default Input;
