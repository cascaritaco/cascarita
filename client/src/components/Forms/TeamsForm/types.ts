interface TeamFormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
  requestType?: "POST" | "PATCH" | "DELETE";
  teamId?: number;
  divisionId?: number;
  seasonId?: number;
}

interface TeamFormData {
  name: string;
  team_logo: File | null;
  season_id: number;
  division_id: number;
}

interface CreateNewTeamData {
  formData: TeamFormData;
}

interface UpdateTeamData {
  id: number;
  formData: TeamFormData;
}

interface DeleteTeamData {
  id: number;
}

interface TeamResponse {
  id: number;
  groupId: number;
  name: string;
  team_logo: HTMLImageElement;
  updated_at: string;
  created_at: string;
}

export type {
  TeamFormProps,
  TeamFormData,
  CreateNewTeamData,
  UpdateTeamData,
  DeleteTeamData,
  TeamResponse,
};
