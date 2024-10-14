import { UserResponse, LanguageCodeToLanguageId } from "./types";

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

const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  roleId: number,
  languageId: number,
  groupId: number | null, // they might be joining an existing group
  name: string | null,
  streetAddress: string | null,
  city: string | null,
  state: string | null,
  zipCode: string | null,
  // logoUrl: string | null, // still need to set up s3 buckets for images so for now we wont collect this and just set it to null
) => {
  try {
    const registerData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      role_id: roleId ? roleId : 1,
      language_id: 1,
      group_id: groupId,
      name: name,
      street_address: streetAddress,
      city: city,
      state: state,
      zip_code: zipCode,
      // logo_url: logoUrl,
    };

    const response = await fetch(`/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
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
