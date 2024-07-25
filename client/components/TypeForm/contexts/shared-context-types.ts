import { QuestionsActionsType } from "../reducers/actions/questionsActions";
import { QuestionsStateType } from "../reducers/states/questionsInitialState";
import { Dispatch, SetStateAction } from "react";
/**
 * questions-context
 */

export type QuestionsContextType = {
  readonly state: QuestionsStateType;
  readonly dispatch: Dispatch<QuestionsActionsType>;
  readonly percent: number;
};

/**
 * shared-states-context
 */

export type ObjectType = {
  [key: string]: string;
};

export type QuestionNumType = { prev: null | number; now: number };

export type SharedStatesContextType = {
  readonly questionNum: QuestionNumType;
  readonly setQuestionNum: Dispatch<SetStateAction<QuestionNumType>>;
  readonly errorMsg: ObjectType;
  readonly setErrorMsg: Dispatch<SetStateAction<ObjectType>>;
  readonly handleQuestionNumUpdate: () => void;
  readonly handleOkClick: () => void;
  readonly handleBackClick: () => void;
};
