import { createContext, ReactNode, useContext, useState } from "react";
import {
  ObjectType,
  QuestionNumType,
  SharedStatesContextType,
} from "./shared-context-types";
import { useNavigate } from "react-router-dom";

const SharedStatesContext = createContext<SharedStatesContextType>({
  totalQuestions: 0,
  setTotalQuestions: () => {},
  questionNum: { prev: null, now: 0 },
  setQuestionNum: () => {},
  errorMsg: {},
  setErrorMsg: () => {},
  handleQuestionNumUpdate: () => {},
  handleOkClick: () => {},
  handleBackClick: () => {},
});

type SharedStatesProviderType = {
  readonly children: ReactNode;
};

export function SharedStatesProvider({ children }: SharedStatesProviderType) {
  const navigate = useNavigate();

  const [questionNum, setQuestionNum] = useState<QuestionNumType>({
    prev: null,
    now: 0,
  });
  const [errorMsg, setErrorMsg] = useState<ObjectType>({});
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  function handleQuestionNumUpdate() {
    setQuestionNum((prevValue) =>
      prevValue.now + 1 >= totalQuestions + 1
        ? { ...prevValue }
        : { prev: prevValue.now, now: prevValue.now + 1 },
    );
  }

  function handleBackClick() {
    setErrorMsg({});
    setQuestionNum((prevValue) =>
      prevValue.now - 1 < 0
        ? { ...prevValue }
        : { prev: prevValue.now, now: prevValue.now - 1 },
    );
  }

  function handleOkClick(isFinal?: boolean) {
    if (isFinal) {
      navigate("/forms");
    }
    document.dispatchEvent(
      new KeyboardEvent("keypress", {
        key: "Enter",
      }),
    );
  }

  const value: SharedStatesContextType = {
    totalQuestions,
    setTotalQuestions,
    questionNum,
    setQuestionNum,
    errorMsg,
    setErrorMsg,
    handleQuestionNumUpdate,
    handleOkClick,
    handleBackClick,
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
