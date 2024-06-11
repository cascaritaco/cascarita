import { Survey } from "./types";

// TODO: Create a call to fetch all forms by groupId (this will be the call to replace the forms stored in localStorage)

// fetches form data by endpoint (e.g. fetch form and/or form responses)
export const fetchFormData = async (formId: string, endpoint: string) => {
  try {
    const response = await fetch(`/api/survey/${formId}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching survey data:", error);
    throw error;
  }
};

export const createForm = async (
  data: Survey,
  title: string,
  description: string,
  groupId: number | undefined,
) => {
  const surveyData = {
    title,
    welcome_screens: [
      {
        title,
        properties: {
          description,
        },
      },
    ],
    ...data,
  };
  try {
    const response = await fetch(`/api/forms/${groupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error creating survey:", err);
  }
};

export const updateForm = async (
  data: Survey,
  formId: string,
  title: string,
  description: string,
) => {
  const surveyData = {
    title,
    welcome_screens: [
      {
        title,
        properties: {
          description,
        },
      },
    ],
    ...data,
  };

  try {
    const response = await fetch(`/api/survey/${formId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    });

    if (!response.ok) {
      throw new Error("Failed to update form");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteForm = async (id: string) => {
  try {
    const response = await fetch(`/api/survey/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete form");
    }
  } catch (error) {
    console.error(error);
  }
};
