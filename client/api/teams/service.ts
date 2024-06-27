// import { TeamResponse } from "./types";
// import { QueryFunctionContext } from "@tanstack/react-query";

// type UserQueryKey = [string, number];

const createNewTeam = async (formData: object) => {
  try {
    const response = await fetch(`/api/team/create`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error creating team: ", error);
    throw error;
  }
};

export { createNewTeam };
