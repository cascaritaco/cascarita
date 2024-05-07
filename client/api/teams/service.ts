import { TeamResponse } from "./types";

const createTeam = async (
  group_id: string,
  name: string
): Promise<TeamResponse> => {
  try {
    const response = await fetch(`/api/team/create`, {
      method: "POST",
      body: JSON.stringify({ group_id, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { createTeam };
