import {
  QuestionsActionsType,
  REMOVE_GOAL,
  SET_PHONE_NUMBER,
  SET_LAST_NAME,
  SET_INDUSTRY,
  SET_ROLE,
  SET_GOALS,
  SET_EMAIL,
} from "../actions/questionsActions";

import { QuestionsStateType } from "../states/questionsInitialState";

export function questionsReducerFunc(
  state: QuestionsStateType,
  action: QuestionsActionsType,
) {
  switch (action.type) {
    case SET_PHONE_NUMBER:
      console.log("I am setting the state here", action.payload);
      console.log(action.type);
      return { ...state, phoneNumber: action.payload };

    case SET_LAST_NAME:
      return { ...state, lastName: action.payload };

    case SET_INDUSTRY:
      return { ...state, industry: action.payload };

    case SET_ROLE:
      return { ...state, role: action.payload };

    case SET_GOALS:
      return { ...state, goals: [...state.goals, action.payload] };

    case REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter((goal) => goal !== action.payload),
      };

    case SET_EMAIL:
      return { ...state, email: action.payload };

    default:
      console.log("Within default with state: ", state);
      return state;
  }
}
