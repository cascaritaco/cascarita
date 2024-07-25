export const questionsInitialState = {
  phoneNumbers: {},
  lastName: "",
  industry: "",
  role: "",
  goals: [],
  email: "",
};

export type QuestionsStateType = {
  phoneNumbers: { [key: string]: string };
  lastName: string;
  industry: string;
  role: string;
  goals: string[];
  email: string;
};
