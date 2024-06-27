import React from "react";
import { FieldProps } from "../types";
import { FieldError, useFormContext } from "react-hook-form";
import styles from "./MultipleChoice.module.css";

const MultipleChoice = ({ field, index }: FieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { required } = field.validations ?? {};

  const fieldError = (
    errors.answers as
      | {
          [key: number]: {
            choices?: { labels?: FieldError };
            choice?: { label?: FieldError };
          };
        }
      | undefined
  )?.[index];

  const isMultipleSelection = field.properties?.allow_multiple_selection;

  return (
    <section className={styles.container}>
      <div className={styles.questionContainer}>
        <h3 className={styles.question}>Question: {field.title}</h3>
        {field.validations?.required && (
          <span className={styles.required}>*</span>
        )}
      </div>
      {fieldError && (
        <span className={styles.errorMessage}>
          {isMultipleSelection
            ? fieldError.choices?.labels?.message
            : fieldError.choice?.label?.message}
        </span>
      )}
      <div className={styles.choicesContainer}>
        {field.properties?.choices?.map((choice) => (
          <label key={choice.id} className={styles.choiceLabel}>
            <input
              type={isMultipleSelection ? "checkbox" : "radio"}
              value={choice.label}
              {...register(
                isMultipleSelection
                  ? `answers.${index}.choices.labels`
                  : `answers.${index}.choice.label`,
                {
                  required: required && "This field is required",
                },
              )}
            />
            {choice.label}
          </label>
        ))}
      </div>
    </section>
  );
};

export default MultipleChoice;
