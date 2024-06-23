interface TeamResponse {
  id: number;
  group_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface FormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
}

interface LeagueType {
  id: number;
  group_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

interface SeasonType {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  league_id: number;
}

export type { TeamResponse, FormProps, LeagueType, SeasonType };
