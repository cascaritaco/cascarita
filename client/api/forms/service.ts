import { Form, GetFormsParams } from "./types";

// TODO: Create a call to fetch all forms by groupId
// TODO: Start Routing to forms instead of surveys (this will be editted as more routes are called to the forms endpoint)

export const getTypeformForms = async ({
  page = 1,
  page_size = 10,
  search,
  workspace_id,
  sort_by,
  order_by,
}: GetFormsParams = {}) => {
  try {
    const params = {
      page: page.toString(),
      page_size: page_size.toString(),
      ...(search && { search }),
      ...(workspace_id && { workspace_id }),
      ...(sort_by && { sort_by }),
      ...(order_by && { order_by }),
    };

    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`/api/surveys?${queryParams}`);

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error fetching forms:", responseBody);
      throw new Error(`Error fetching forms: ${response.statusText}`);
    }

    return responseBody;
  } catch (error) {
    console.error("Server error:", error);
    throw error;
  }
};

// fetches form data by endpoint (e.g. fetch form and/or form responses)
export const fetchTypeformFormData = async (
  formId: string,
  endpoint: string,
) => {
  try {
    const response = await fetch(`/api/survey/${formId}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw error;
  }
};

export const updateTypeformForm = async (
  data: Form,
  formId: string,
  title: string,
  description: string,
) => {
  const formData = {
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
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update form");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteTypeformForm = async (id: string) => {
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

export const createMongoForm = async (
  data: Form,
  title: string,
  description: string,
  groupId: number | undefined,
  userId: number | undefined,
) => {
  const formData = {
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
    const response = await fetch(`/api/forms/${groupId}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error creating form:", err);
  }
};

export const getMongoForms = async (groupId: number) => {
  try {
    const response = await fetch(`/api/forms/${groupId}/forms`);

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error fetching forms:", responseBody);
      throw new Error(`Error fetching forms: ${response.statusText}`);
    }

    return responseBody;
  } catch (error) {
    console.error("Server error:", error);
    throw error;
  }
};

export const getMongoFormById = async (formId: string) => {
  try {
    const response = await fetch(`/api/forms/${formId}`);

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error fetching form:", responseBody);
      throw new Error(`Error fetching form: ${response.statusText}`);
    }

    return responseBody;
  } catch (error) {
    console.error("Server error:", error);
    throw error;
  }
};
