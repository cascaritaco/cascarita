import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMongoFormById } from "../../api/forms/service";
import { Field, Form } from "./types";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormFooter from "../../components/FormFooter/FormFooter";
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

  // TODO: These will be components that have styles
  if (isLoading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>An error occurred: {error.message}</div>; // Show error state

  const buildFormData = (formData: Form): Field[] => {
    // Note: the first Field data to pass to Typeform based survey should always be intro
    const introField: Field = {
      id: "",
      title: formData.form_data.welcome_screens[0].title || "Untitled Survey",
      description:
        formData.form_data.welcome_screens[0].properties.description || "",
      ref: "",
      type: "short_text",
    };
    const data = [introField, ...formData.form_data.fields];
    return data;
  };

  return (
    <>
      <FormHeader />
      {!isLoading && !error && form && (
        <main className={styles.main}>
          <SharedStatesProvider>
            <QuestionsProvider>
              <FormWalkthrough data={buildFormData(form)} />
            </QuestionsProvider>
          </SharedStatesProvider>
        </main>
      )}
      <FormFooter />
    </>
  );
};

export default FormPage;
