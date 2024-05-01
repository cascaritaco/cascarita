interface TeamResponse {
  id: number;
  group_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface DivisionResponse {
  id: number;
  group_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export type { TeamResponse, DivisionResponse };
