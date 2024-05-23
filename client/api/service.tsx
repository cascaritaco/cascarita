import { TeamResponse, SeasonType } from "./types";

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

const createSeason = async (
  name: string,
  start_date: string,
  end_date: string,
  is_active: boolean = true,
  league_id: number = 1
): Promise<SeasonType> => {
  try {
    const response = await fetch("/api/seasons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        start_date,
        end_date,
        is_active,
        league_id,
      }),
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("error fetching data:", error);
    throw error;
  }
};

export { createTeam, createSeason };
