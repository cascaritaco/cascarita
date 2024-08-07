import { UserResponse, LanguageCodeToLanguageId } from "./types";

const updateUsersLanguages = async (
  user_id: number,
  language: string,
): Promise<UserResponse> => {
  const language_id = LanguageCodeToLanguageId[language as "en" | "esp"];

  try {
    const response = await fetch(`/api/users/${user_id}/languages`, {
      method: "POST",
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

const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  try {
    const registerData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export { updateUsersLanguages, registerUser };
