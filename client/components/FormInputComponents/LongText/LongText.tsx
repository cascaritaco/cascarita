import React, { useState } from "react";
import { FieldProps } from "../types";
import { FieldError, useFormContext } from "react-hook-form";
import styles from "./LongText.module.css";

const LongText = ({ field, index }: FieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [textAreaValue, setTextAreaValue] = useState("");
  const { required, max_length: maxLength } = field.validations ?? {};

  const fieldError = (
    errors.answers as { [key: number]: { text?: FieldError } } | undefined
  )?.[index]?.text;

  const { onChange: registerOnChange, ...registerProps } = register(
    `answers.${index}.text`,
    {
      required: required && "This field is required",
      maxLength: maxLength && {
        value: maxLength,
        message: `Answer has to be less than ${maxLength} characters`,
      },
    },
  );

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    initialHeight: string = "auto",
  ) => {
    setTextAreaValue(event.target.value);
    const textArea = event.target;
    textArea.style.height = initialHeight;
    textArea.style.height = `${textArea.scrollHeight}px`; // Set height
    registerOnChange(event);
  };

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
      <textarea
        className={styles.input}
        placeholder="Type your answer here..."
        rows={1}
        onChange={(e) => handleTextAreaChange(e, "42px")}
        value={textAreaValue}
        {...registerProps}
      />
      <p className={styles.longTextToolTip}>
        <strong>Shift ⇧</strong>
        <strong>Enter ↵</strong>
        to make a line break
      </p>
    </section>
  );
};

export default LongText;
