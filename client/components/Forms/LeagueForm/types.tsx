import { User } from "../../AuthContext/types";

interface LeagueFormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
  currentUser: User;
}

export type { LeagueFormProps };
