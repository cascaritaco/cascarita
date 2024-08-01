export const questionsInitialState = {
  dropdownResponses: {},
  shortTextResponses: {},
};

export type QuestionsStateType = {
  shortTextResponses: { [key: string]: string };
  dropdownResponses: { [key: string]: string };
};
