import { QueryFunctionContext } from "@tanstack/react-query";

type UserQueryKey = [string, number];

const getTeamByGroupId = async ({
  queryKey,
}: QueryFunctionContext<UserQueryKey>) => {
  const [, groudId] = queryKey;
  try {
    const response = await fetch(`/api/teams/groups/${groudId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching teams: ", error);
    throw error;
  }
};

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

export { createNewTeam, getTeamByGroupId };
