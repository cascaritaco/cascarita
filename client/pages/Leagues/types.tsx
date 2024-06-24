import { User } from "../../components/AuthContext/types";

interface LeaguesProps {
  currentUser: User;
}

interface LeagueType {
  id: number;
  group_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export type { LeaguesProps, LeagueType };
