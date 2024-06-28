interface TeamType {
  id: number;
  group_id: number;
  name: string;
  league: string;
  division: string;
  season: string;
  created_at: Date;
  updated_at: Date;
}

export type { TeamType };
