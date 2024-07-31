export const SET_SHORT_TEXT_RESPONSE = "SET_SHORT_TEXT_RESPONSE";
export const SET_DROPDOWN_RESPONSE = "SET_DROPDOWN_RESPONSE";

export type QuestionsActionsType =
  | {
      type: "SET_SHORT_TEXT_RESPONSE";
      payload: { type: string; value: string };
    }
  | {
      type: "SET_DROPDOWN_RESPONSE";
      payload: { type: string; value: string };
    };
