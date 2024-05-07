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
  group_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface SeasonResponse {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  league_id: number;
}

export type { TeamResponse, FormProps, LeagueResponse, SeasonResponse };
