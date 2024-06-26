import React from "react";
import { FieldProps } from "../types";
import { FieldError, useFormContext } from "react-hook-form";
import styles from "./ShortText.module.css";

const ShortText = ({ field, index }: FieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { required, max_length: maxLength } = field.validations ?? {};

  const fieldError = (
    errors.answers as { [key: number]: { text?: FieldError } } | undefined
  )?.[index]?.text;

  return (
    <section className={styles.container}>
      <h3 className={styles.question}>Question: {field.title}</h3>
      {field.validations?.required && (
        <span className={styles.required}>*</span>
      )}
      {fieldError && (
        <span className={styles.errorMessage}>{fieldError.message}</span>
      )}
      <input
        className={styles.input}
        type="text"
        placeholder="Type your answer here..."
        {...register(`answers.${index}.text`, {
          required: required && "This field is required",
          maxLength: maxLength && {
            value: maxLength,
            message: `Answer has to be less than ${maxLength} characters`,
          },
        })}
      />
    </section>
  );
};

export default ShortText;
