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

export type { TeamResponse, FormProps };
