import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMongoFormById } from "../../api/forms/service";
import { useForm } from "react-hook-form";
import { Field, Form } from "./types";
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
    queryFn: () => getMongoFormById(formId!),
    enabled: !!formId,
  });
  const methods = useForm<{ fields: Field[] }>({
    defaultValues: { fields: form?.form_data.fields ?? [] },
  });

  if (isLoading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>An error occurred: {error.message}</div>; // Show error state

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  // Render the form based on the fetched data
  return (
    <>
      <FormHeader />
      <div className={styles.container}>
        <form
          className={styles.formContent}
          onSubmit={methods.handleSubmit(onSubmit)}>
          {JSON.stringify(form, null, 2)}
          <button type="submit">Submit</button>
        </form>
      </div>
      {error && <div>Error in form submission</div>}
      <FormFooter />
    </>
  );
};

export default FormPage;
