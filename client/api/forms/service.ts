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

    if (!response.ok) {
      throw new Error(`Error fetching forms: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error fetching forms:", err);
    throw err;
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
  } catch (err) {
    console.error("Error fetching form data:", err);
    throw err;
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
  } catch (err) {
    console.error("Error updating form:", err);
    throw err;
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
  } catch (err) {
    console.error("Error deleting form:", err);
    throw err;
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
    throw err;
  }
};

export const getMongoForms = async (groupId: number) => {
  try {
    const response = await fetch(`/api/groups/${groupId}/forms`);

    if (!response.ok) {
      throw new Error(`Error fetching forms: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error fetching forms:", err);
    throw err;
  }
};

export const getMongoFormById = async (formId: string) => {
  try {
    const response = await fetch(`/api/forms/${formId}`);

    if (!response.ok) {
      throw new Error(`Error fetching form: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error fetching form:", err);
    throw err;
  }
};

export const getMongoFormResponses = async (formId: string) => {
  try {
    const response = await fetch(`/api/forms/${formId}/responses`);

    if (!response.ok) {
      throw new Error(`Error fetching form responses: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error fetching responses:", err);
    throw err;
  }
};

export const sendEmail = async (formLink: string, email: string) => {
  try {
    const data = {
      formLink: formLink,
      email: email,
    };
    const response = await fetch(`/api/forms/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error emailing form: ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.error("Error emailing responses:", err);
    throw err;
  }
};
