import { QueryFunctionContext } from "@tanstack/react-query";
import {
  CreateNewTeamData,
  DeleteTeamData,
  UpdateTeamData,
  TeamResponse,
} from "../../components/Forms/TeamsForm/types";

type UserQueryKey = [string, number, number];

const getTeamsBySeasonDivisionId = async ({
  queryKey,
}: QueryFunctionContext<UserQueryKey>) => {
  const [, seasonIdNumber, divisionIdNumber] = queryKey;

  try {
    const response = await fetch(
      `/api/teams/seasons/${seasonIdNumber}/divisions/${divisionIdNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      },
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching league: ", error);
    throw error;
  }
};

const createNewTeam = async (
  data: CreateNewTeamData,
): Promise<TeamResponse> => {
  try {
    const response = await fetch(`/api/teams`, {
      method: "POST",
      body: JSON.stringify(data.formData),
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

const updateTeam = async (data: UpdateTeamData): Promise<TeamResponse> => {
  try {
    const response = await fetch(`/api/teams/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data.formData),
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

const deleteTeam = async (data: DeleteTeamData): Promise<void> => {
  try {
    const response = await fetch(`/api/teams/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (
      response.status === 204 ||
      response.headers.get("Content-Length") === "0"
    ) {
      return;
    }

    return response.json();
  } catch (error) {
    console.error("Error creating team: ", error);
    throw error;
  }
};

export { getTeamsBySeasonDivisionId, createNewTeam, updateTeam, deleteTeam };
