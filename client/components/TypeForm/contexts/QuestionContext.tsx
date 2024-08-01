import { questionsInitialState } from "../reducers/states/questionsInitialState";
import { questionsReducerFunc } from "../reducers/reducer-func/questionsReducerFunc";

import { QuestionsContextType } from "./shared-context-types";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { useSharedStates } from "./SharedContext";

const QuestionsContext = createContext<QuestionsContextType>({
  state: questionsInitialState,
  dispatch: () => {},
  percent: 0,
});

type QuestionsProviderType = {
  readonly children: ReactNode;
};

export function QuestionsProvider({ children }: QuestionsProviderType) {
  const { questionNum, totalQuestions } = useSharedStates();
  const { now } = questionNum;

  const [state, dispatch] = useReducer(
    questionsReducerFunc,
    questionsInitialState,
  );

  const percent = useMemo(
    function () {
      return (now * 100) / totalQuestions;
    },
    [state, now],
  );

  const value = { state, dispatch, percent };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions(): QuestionsContextType {
  const context = useContext(QuestionsContext);

  if (context) {
    return context;
  }

  throw new Error("useQuestions must be use inside QuestionsProvider");
}
