interface SeasonFormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
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

export type { SeasonFormProps, SeasonType };
