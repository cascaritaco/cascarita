import { QueryFunctionContext } from "@tanstack/react-query";

type UserQueryKey = [string, number];

const getDivisionsBySeasonId = async ({
  queryKey,
}: QueryFunctionContext<UserQueryKey>) => {
  const [, seasonId] = queryKey;

  try {
    const response = await fetch(`/api/seasons/${seasonId}/divisions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching league: ", error);
    throw error;
  }
};

const createDivision = async (formData: object) => {
  try {
    const response = await fetch("/api/divisions", {
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
export { getDivisionsBySeasonId, createDivision };
