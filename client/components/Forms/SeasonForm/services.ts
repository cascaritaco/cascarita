import { QueryFunctionContext } from "@tanstack/react-query";

type UserQueryKey = [string, number];

const getSeasonsByLeagueId = async ({
  queryKey,
}: QueryFunctionContext<UserQueryKey>) => {
  const [, leagueId] = queryKey;
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

const createSeason = async (formData: object) => {
  try {
    const response = await fetch("/api/seasons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  } catch (error) {
    console.error("error fetching data:", error);
    throw error;
  }
};

export { createSeason, getSeasonsByLeagueId };
