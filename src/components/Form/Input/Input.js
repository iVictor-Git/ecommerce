import React from "react";
import styles from "./Input.css";

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

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id}>{props.field}:</label>
      {element}
    </div>
  );
};

export default Input;
