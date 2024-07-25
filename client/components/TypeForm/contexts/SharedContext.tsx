import { createContext, ReactNode, useContext, useState } from "react";
import {
  ObjectType,
  QuestionNumType,
  SharedStatesContextType,
} from "./shared-context-types";

// TODO: Make this filtered out later
const TOTAL_QUESTIONS = 3;

const SharedStatesContext = createContext<SharedStatesContextType>({
  questionNum: { prev: null, now: 0 },
  setQuestionNum: () => {},
  errorMsg: {},
  setErrorMsg: () => {},
  handleQuestionNumUpdate: () => {},
  handleOkClick: () => {},
});

type SharedStatesProviderType = {
  readonly children: ReactNode;
};

export function SharedStatesProvider({ children }: SharedStatesProviderType) {
  const [questionNum, setQuestionNum] = useState<QuestionNumType>({
    prev: null,
    now: 0,
  });

  const [errorMsg, setErrorMsg] = useState<ObjectType>({});

  function handleQuestionNumUpdate() {
    setQuestionNum((prevValue) =>
      prevValue.now + 1 >= TOTAL_QUESTIONS + 1
        ? { ...prevValue }
        : { prev: prevValue.now, now: prevValue.now + 1 },
    );
  }

  function handleOkClick() {
    console.log("Inside the handleOkClick function");
    document.dispatchEvent(
      new KeyboardEvent("keypress", {
        key: "Enter",
      }),
    );
  }

  const value: SharedStatesContextType = {
    questionNum,
    setQuestionNum,
    errorMsg,
    setErrorMsg,
    handleQuestionNumUpdate,
    handleOkClick,
  };

  return (
    <SharedStatesContext.Provider value={value}>
      {children}
    </SharedStatesContext.Provider>
  );
}

export function useSharedStates(): SharedStatesContextType {
  const context = useContext(SharedStatesContext);

  if (!context) {
    throw new Error("useSharedStates must be used inside SharedStatesProvider");
  }

  return context;
}
