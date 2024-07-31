import { useSharedStates } from "../contexts/SharedContext";
import { useQuestions } from "../contexts/QuestionContext";
import { useEffect } from "react";
import { QuestionType } from "../Question/types";
import { useNavigate } from "react-router-dom";

export function useHandleKeypress(
  questions: {
    type: QuestionType;
    index: number;
    required: boolean;
  }[],
) {
  const navigate = useNavigate();
  const { totalQuestions, questionNum, setErrorMsg, handleQuestionNumUpdate } =
    useSharedStates();
  const { now } = questionNum;
  const { state } = useQuestions();
  const { phoneNumbers, shortTextResponses, industry, role, goals, email } =
    state;

  const currentQuestion = questions.find((q) => q.index === now);
  const isRequired = currentQuestion?.required;

  useEffect(() => {
    function handleKeypress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (now + 1 === totalQuestions) navigate("/forms");
        if (now !== 0 && isRequired) {
          //skipping the intro and or validaton on required questions
          if (
            !(`shortTextResponses${now}` in shortTextResponses) ||
            shortTextResponses[`shortTextResponses${now}`] === ""
          ) {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                shortTextResponses: {
                  ...((prevValue.shortTextResponses as {
                    [key: string]: string;
                  }) || {}),
                  [`shortTextResponses${now}`]: "Please fill this in!",
                },
              };
            });
            return;
          } else if (now + 1 === 4 && industry === "") {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                industry: "Oops! Please make a selection",
              };
            });
            return;
          } else if (now + 1 === 5 && role === "") {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                role: "Oops! Please make a selection",
              };
            });
            return;
          } else if (now + 1 === 6 && goals.length === 0) {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                goals: "Oops! Please make a selection",
              };
            });
            return;
          } else if (now + 1 === 6 && goals.length === 1) {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                goals: "Please select more choices",
              };
            });
            return;
          } else if (now + 1 === 7 && email === "") {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                email: "Please fill this in",
              };
            });
            return;
          } else if (now + 1 === 7 && email && true) {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                email: "Hmm... that email doesn't look right",
              };
            });
            return;
          } else if (now + 1 === 7 && email) {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                email: "Hmm... task specific emails are not allowed",
              };
            });
            return;
          }
        }

        handleQuestionNumUpdate();
      }
    }

    document.addEventListener("keypress", handleKeypress);

    return function () {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [
    phoneNumbers,
    industry,
    shortTextResponses,
    now,
    role,
    goals,
    email,
    setErrorMsg,
    handleQuestionNumUpdate,
  ]);
}
