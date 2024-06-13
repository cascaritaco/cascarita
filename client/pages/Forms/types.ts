import { Field } from "../../components/DNDCanvas/types";

export interface WelcomeScreen {
  id: string;
  ref: string;
  title: string;
  properties: {
    show_button: boolean;
    button_text: string;
    description: string;
  };
}

export interface Form {
  id: string;
  editedBy: string;
  last_updated_at: string;
  title: string;
  description: string;
  welcome_screens: WelcomeScreen[];
  fields: Field[];
  _links: {
    display: string;
    responses: string;
  };
}
