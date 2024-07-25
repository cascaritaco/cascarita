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
import { createMongoResponse } from "../../api/forms/service";
import FormHeader from "../../components/FormHeader/FormHeader";
// import FormFooter from "../../components/FormFooter/FormFooter";
import styles from "./FormPage.module.css";
import { FormWalkthrough } from "../../components/TypeForm/FormWalkthrough/FormWalkthrough";
import { QuestionsProvider } from "../../components/TypeForm/contexts/QuestionContext";
import { SharedStatesProvider } from "../../components/TypeForm/contexts/SharedContext";

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

  const onSubmit = async (data: { answers: Answer[] }) => {
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

    try {
      const responsesData = await createMongoResponse(
        formId ?? "",
        normalizedAnswers,
      );
      return responsesData;
    } catch (error) {
      console.error("Error creating responses:", error);
      throw error;
    }
  };

  return (
    <>
      <FormHeader />
      {/* <div className={styles.container}>
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
      </div> */}
      {/* <BtnContainer showPressEnter={true} onClick={handleOkClick}>
        Next
      </BtnContainer> */}

      <main className={styles.main}>
        <QuestionsProvider>
          <SharedStatesProvider>
            <FormWalkthrough />
          </SharedStatesProvider>
        </QuestionsProvider>
      </main>
      {/* <FormFooter /> */}
    </>
  );
};

export default FormPage;
