import { SeasonType } from "./types"; // need to delete this line

import { QueryFunctionContext } from "@tanstack/react-query";

type UserQueryKey = [string, number];

const getSeasonsByLeagueId = async ({
  queryKey,
}: QueryFunctionContext<UserQueryKey>) => {
  const [, leagueId] = queryKey;
  console.log(leagueId);
  try {
    const response = await fetch(`/api/seasons/${leagueId}/leagues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching seasons by league id: ", error);
    throw error;
  }
};

// UPDATE THIS CREATE SEASON TYPE - needs to be deleted
const createSeason = async (
  name: string,
  start_date: string,
  end_date: string,
  is_active: boolean = true,
  league_id: number = 1,
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

export { createSeason, getSeasonsByLeagueId };
