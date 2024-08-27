import React from "react";
import { FieldProps } from "../types";
import styles from "./ShortText.module.css";

const Payment = ({ field, index }: FieldProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.questionContainer}>
        <h3 className={styles.question}>
          Question: {field.title} {index}
        </h3>
        {field.validations?.required && (
          <span className={styles.required}>*</span>
        )}
      </div>
      {/* TODO: Create the Stripe form through here*/}
    </section>
  );
};

export default Payment;
