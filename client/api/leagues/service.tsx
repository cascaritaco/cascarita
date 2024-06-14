import { QueryFunctionContext } from "@tanstack/react-query";

type UserQueryKey = [string, number];

const getLeagueByGroupId = async ({
  queryKey,
}: QueryFunctionContext<UserQueryKey>) => {
  const [, groupId] = queryKey;
  try {
    const response = await fetch(`/api/groups/${groupId}/leagues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Error fetching league: ", error);
    throw error;
  }
};

const createNewLeague = async (formData: object) => {
  try {
    const response = await fetch("/api/leagues/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return response.json();
  } catch (error) {
    console.error("Error creating league: ", error);
    throw error;
  }
};

export { getLeagueByGroupId, createNewLeague };
