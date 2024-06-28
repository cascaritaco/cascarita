import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMongoFormById } from "../../api/forms/service";
import { FormProvider, useForm } from "react-hook-form";
import {
  Answer,
  AnswerMap,
  AnswerType,
  Field,
  FieldComponents,
  Form,
} from "./types";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormFooter from "../../components/FormFooter/FormFooter";
import styles from "./FormPage.module.css";

const FormPage = () => {
  const { formId } = useParams();
  const {
    data: form,
    isLoading,
    error,
  } = useQuery<Form, Error>({
    queryKey: ["form", formId],
    queryFn: () =>
      formId
        ? getMongoFormById(formId)
        : Promise.reject(new Error("Form ID is undefined")),
  });

  const methods = useForm<{ answers: Answer[] }>({
    defaultValues: { answers: [] },
  });

  // TODO: These will be components that have styles
  if (isLoading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>An error occurred: {error.message}</div>; // Show error state

  const onSubmit = (data: { answers: Answer[] }) => {
    const normalizedAnswers: Answer[] =
      form?.form_data.fields.map((field: Field, index: number) => {
        const answerType =
          field.type === "multiple_choice" &&
          field.properties?.allow_multiple_selection
            ? "choices"
            : (AnswerMap[field.type] as AnswerType);

        return {
          ...data.answers[index],
          field: { id: field.id, type: field.type, ref: field.ref },
          type: answerType,
        };
      }) ?? [];
    // TODO: send this to the backend as an API call
    return normalizedAnswers;
  };

  return (
    <>
      <FormHeader />
      <div className={styles.container}>
        {form != null && (
          <FormProvider {...methods}>
            <form
              className={styles.formContent}
              onSubmit={methods.handleSubmit(onSubmit)}>
              <h1 className={styles.title}>{form?.form_data.title}</h1>

              {form.form_data.fields.map((field: Field, index: number) => {
                const FieldComponent = FieldComponents[field.type];
                if (!FieldComponent) return null;
                return (
                  <FieldComponent key={field.id} field={field} index={index} />
                );
              })}
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </FormProvider>
        )}
      </div>
      <FormFooter />
    </>
  );
};

export default FormPage;
