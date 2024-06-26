import React, { useEffect } from "react";
import { FieldProps } from "../types";
import { useFormContext } from "react-hook-form";

const ShortText = ({ field, index }: FieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section>
      <h3>Question: {field.title}</h3>
      {field.validations?.required && <span>*</span>}
      <input
        type="text"
        placeholder="Type your answer here..."
        {...register(`answers.${index}.text`, {
          required: field.validations?.required,
          maxLength: field.validations?.max_length,
        })}
      />
      {errors.fieldValidation && (
        <span>
          This field is required / response must be larger than
          {field.validations?.max_length} characters
        </span>
      )}
    </section>
  );
};

export default ShortText;
