import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMongoFormById } from "../../api/forms/service";

const FormPage = () => {
  const { formId } = useParams(); // Extract the form ID from the URL

  const {
    data: form,
    isLoading,
    error,
  } = useQuery<unknown, Error>({
    queryKey: ["form", formId],
    queryFn: () => getMongoFormById(formId!),
    enabled: !!formId,
  });

  if (isLoading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>An error occurred: {error.message}</div>; // Show error state

  // Render the form based on the fetched data
  return (
    <div>
      <h1>{JSON.stringify(form)}</h1>
      {/* Render form fields based on `formData` */}
    </div>
  );
};

export default FormPage;
