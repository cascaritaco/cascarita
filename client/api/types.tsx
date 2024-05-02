interface TeamResponse {
  id: number;
  group_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface FormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
}

interface LeagueResponse {
  id: number;
  // group_id: number;
  name: string;
  // description: string;
  // created_at: string;
  // updated_at: string;
}

export type { TeamResponse, FormProps, LeagueResponse };
