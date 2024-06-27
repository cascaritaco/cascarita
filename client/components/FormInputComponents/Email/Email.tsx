import React from "react";
import { FieldProps } from "../types";
import { FieldError, useFormContext } from "react-hook-form";
import styles from "./Email.module.css";

const Email = ({ field, index }: FieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { required, max_length: maxLength } = field.validations ?? {};

  const fieldError = (
    errors.answers as { [key: number]: { email?: FieldError } } | undefined
  )?.[index]?.email;

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
      <input
        className={styles.input}
        type="email"
        placeholder="name@example.com"
        {...register(`answers.${index}.email`, {
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

export default Email;
