import { QuestionsActionsType } from "../reducers/actions/questionsActions";
import { QuestionsStateType } from "../reducers/states/questionsInitialState";
import { Dispatch, SetStateAction } from "react";

export type QuestionsContextType = {
  readonly state: QuestionsStateType;
  readonly dispatch: Dispatch<QuestionsActionsType>;
  readonly percent: number;
};

export type ObjectType = {
  [key: string]: string | { [key: string]: string };
};

export type QuestionNumType = { prev: null | number; now: number };

export type SharedStatesContextType = {
  readonly totalQuestions: number;
  readonly setTotalQuestions: Dispatch<SetStateAction<number>>;
  readonly questionNum: QuestionNumType;
  readonly setQuestionNum: Dispatch<SetStateAction<QuestionNumType>>;
  readonly errorMsg: ObjectType;
  readonly setErrorMsg: Dispatch<SetStateAction<ObjectType>>;
  readonly handleQuestionNumUpdate: () => void;
  readonly handleOkClick: (isFinal?: boolean) => void;
  readonly handleBackClick: () => void;
};
