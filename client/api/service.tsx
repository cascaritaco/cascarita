import { TeamResponse, DivisionResponse } from "./types";

const createTeam = async (
  groupId: string,
  name: string
): Promise<TeamResponse> => {
  try {
    const response = await fetch(`/api/team/create`, {
      method: "POST",
      body: JSON.stringify({ group_id: groupId, name }),
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

const createDivision = async (
  groupId: string,
  name: string
): Promise<DivisionResponse> => {
  try {
    const response = await fetch(`/api/division`, {
      method: "POST",
      body: JSON.stringify({ group_id: groupId, name }),
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

export { createTeam, createDivision };
