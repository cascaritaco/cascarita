interface TeamFormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void;
}

interface FormFields {
  teamName: string;
  teamDivision: string;
  teamLogo: HTMLImageElement;
}

export type { TeamFormProps, FormFields };
