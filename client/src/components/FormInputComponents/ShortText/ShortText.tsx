import { FieldProps } from "../types";
import { FieldError, useFormContext } from "react-hook-form";
import styles from "./ShortText.module.css";
import { useTranslation } from "react-i18next";

const ShortText = ({ field, index }: FieldProps) => {
  const { t } = useTranslation("FormComponents");
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
      <input
        className={styles.input}
        type="text"
        placeholder={t("shortText.placeholder")}
        {...register(`answers.${index}.text`, {
          required: required && t("required"),
          maxLength: maxLength && {
            value: maxLength,
            message: `${t("shortText.minLength")} ${maxLength}`,
          },
        })}
      />
    </section>
  );
};

export default ShortText;
