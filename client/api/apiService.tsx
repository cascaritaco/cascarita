import { TeamResponse } from "./types";

export const createTeam = async (
  group_id: string,
  name: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResponseData: React.Dispatch<React.SetStateAction<TeamResponse | null>>
): Promise<void> => {
  setLoading(true);
  try {
    const response = await fetch(`/api/team/create`, {
      method: "POST",
      body: JSON.stringify({ group_id, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setResponseData(result.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  setLoading(false);
};
