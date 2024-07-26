export const questionsInitialState = {
  phoneNumbers: {},
  shortTextResponses: {},
  industry: "",
  role: "",
  goals: [],
  email: "",
};

export type QuestionsStateType = {
  phoneNumbers: { [key: string]: string };
  shortTextResponses: { [key: string]: string };
  industry: string;
  role: string;
  goals: string[];
  email: string;
};
