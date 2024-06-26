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

export type { SeasonType };
