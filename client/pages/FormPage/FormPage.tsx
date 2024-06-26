import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMongoFormById } from "../../api/forms/service";
import { FormProvider, useForm } from "react-hook-form";
import { Answer, AnswerType, Field, Form } from "./types";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormFooter from "../../components/FormFooter/FormFooter";
import styles from "./FormPage.module.css";
import ShortText from "../../components/FormInputComponents/ShortText/ShortText";
import MultipleChoice from "../../components/FormInputComponents/MultipleChoice/MultipleChoice";
import Dropdown from "../../components/FormInputComponents/Dropdown/Dropdown";
import Email from "../../components/FormInputComponents/Email/Email";
import LongText from "../../components/FormInputComponents/LongText/LongText";
import PhoneNumber from "../../components/FormInputComponents/PhoneNumber/PhoneNumber";

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
  const AnswerMap = {
    multiple_choice: "choice",
    short_text: "text",
    dropdown: "choice",
    long_text: "text",
    email: "email",
    phone_number: "phone_number",
  };

  const methods = useForm<{ answers: Answer[] }>({
    defaultValues: { answers: [] },
  });

  const FieldComponents = {
    multiple_choice: MultipleChoice,
    short_text: ShortText,
    dropdown: Dropdown,
    long_text: LongText,
    email: Email,
    phone_number: PhoneNumber,
  };

  if (isLoading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>An error occurred: {error.message}</div>; // Show error state

  const onSubmit = (data: { answers: Answer[] }) => {
    const normalizedAnswers: Answer[] =
      form?.form_data.fields.map((field: Field, index: number) => ({
        ...data.answers[index],
        field: { id: field.id, type: field.type, ref: field.ref },
        type: AnswerMap[field.type] as AnswerType,
      })) ?? [];

    console.log(normalizedAnswers);
  };

  // Render the form based on the fetched data
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
