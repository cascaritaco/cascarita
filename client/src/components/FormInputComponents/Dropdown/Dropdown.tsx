import { FieldProps } from "../types";
import { FieldError, useFormContext } from "react-hook-form";
import styles from "./Dropdown.module.css";
import { useTranslation } from "react-i18next";

const Dropdown = ({ field, index }: FieldProps) => {
  const { t } = useTranslation("FormComponents");
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
        <h3 className={styles.question}>
          {t("question")}: {field.title}
        </h3>
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
          required: required && t("required"),
        })}>
        <option value="">{t("dropdown.placeholder")}</option>
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
