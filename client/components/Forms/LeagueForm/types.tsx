import { User } from "../../AuthContext/types";

interface LeagueFormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
}

export type { LeagueFormProps };
