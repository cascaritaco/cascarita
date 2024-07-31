import {
  QuestionsActionsType,
  SET_SHORT_TEXT_RESPONSE,
  SET_DROPDOWN_RESPONSE,
} from "../actions/questionsActions";

import { QuestionsStateType } from "../states/questionsInitialState";

export function questionsReducerFunc(
  state: QuestionsStateType,
  action: QuestionsActionsType,
) {
  switch (action.type) {
    case SET_SHORT_TEXT_RESPONSE:
      return {
        ...state,
        shortTextResponses: {
          ...state.shortTextResponses,
          [action.payload.type]: action.payload.value,
        },
      };

    case SET_DROPDOWN_RESPONSE:
      return {
        ...state,
        dropdownResponses: {
          ...state.dropdownResponses,
          [action.payload.type]: action.payload.value,
        },
      };

    default:
      return state;
  }
}
