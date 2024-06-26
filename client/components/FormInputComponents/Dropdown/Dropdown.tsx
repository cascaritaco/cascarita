import React from "react";
import { FieldProps } from "../types";
import { FieldError, useFormContext } from "react-hook-form";
import styles from "./Dropdown.module.css";

const Dropdown = ({ field, index }: FieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { required } = field.validations ?? {};

  const fieldError = (
    errors.answers as { [key: number]: { text?: FieldError } } | undefined
  )?.[index]?.text;

  return (
    <section className={styles.container}>
      <div className={styles.questionContainer}>
        <h3 className={styles.question}>Question: {field.title}</h3>
        {field.validations?.required && (
          <span className={styles.required}>*</span>
        )}
      </div>
      {fieldError && (
        <span className={styles.errorMessage}>{fieldError.message}</span>
      )}
      <select
        className={styles.input}
        {...register(`answers.${index}.text`, {
          required: required && "This field is required",
        })}>
        <option value="">Select an option</option>
        {field.properties?.choices?.map((choice) => (
          <option key={choice.id} value={choice.label}>
            {choice.label}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Dropdown;
