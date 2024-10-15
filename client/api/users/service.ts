import { UserResponse, LanguageCodeToLanguageId, RegisterUser } from "./types";

const updateUsersLanguages = async (
  user_id: number,
  language: string,
): Promise<UserResponse> => {
  const language_id = LanguageCodeToLanguageId[language as "en" | "esp"];

  try {
    const response = await fetch(`/api/users/${user_id}`, {
      method: "PATCH",
      body: JSON.stringify({ language_id: language_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result.language_id;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const registerUser = async (formData: RegisterUser) => {
  console.log(formData);
  try {
    const response = await fetch(`/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${formData.token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const fetchUser = async (email: string, token: string) => {
  try {
    // Encode the email to ensure it's safe for use in a URL
    console.log("final token for authorization: ", token);
    const response = await fetch(
      `/api/users?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export { updateUsersLanguages, registerUser, fetchUser };
