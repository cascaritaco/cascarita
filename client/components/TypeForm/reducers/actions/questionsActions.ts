export const SET_PHONE_NUMBER = "SET_PHONE_NUMBER";
//TODO: Change these values so that they are matching our specific question types
export const SET_LAST_NAME = "SET_LAST_NAME";
export const SET_INDUSTRY = "SET_INDUSTRY";
export const SET_ROLE = "SET_ROLE";
export const SET_GOALS = "SET_GOALS";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const SET_EMAIL = "SET_EMAIL";

export type QuestionsActionsType =
  | { type: "SET_PHONE_NUMBER"; payload: string }
  | {
      type: "SET_LAST_NAME";
      payload: string;
    }
  | {
      type: "SET_INDUSTRY";
      payload: string;
    }
  | { type: "SET_ROLE"; payload: string }
  | { type: "SET_GOALS"; payload: string }
  | { type: "REMOVE_GOAL"; payload: string }
  | { type: "SET_EMAIL"; payload: string };
