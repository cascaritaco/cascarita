import { useSharedStates } from "../contexts/SharedContext";
import { useQuestions } from "../contexts/QuestionContext";
import { useEffect } from "react";
import { Question } from "../Question/types";
import { useNavigate } from "react-router-dom";

export function useHandleKeypress(questions: Question[]) {
  const navigate = useNavigate();
  const { totalQuestions, questionNum, setErrorMsg, handleQuestionNumUpdate } =
    useSharedStates();
  const { now } = questionNum;
  const { state } = useQuestions();
  const { shortTextResponses, dropdownResponses } = state;

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
            (!(`shortTextResponses${now}` in shortTextResponses) &&
              currentQuestion.type === `shortTextResponses${now}`) ||
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
          } else if (
            (!(`dropdownResponses${now}` in dropdownResponses) &&
              currentQuestion.type === `dropdownResponses${now}`) ||
            dropdownResponses[`dropdownResponses${now}`] === ""
          ) {
            setErrorMsg((prevValue) => {
              return {
                ...prevValue,
                dropdownResponses: {
                  ...((prevValue.dropdownResponses as {
                    [key: string]: string;
                  }) || {}),
                  [`dropdownResponses${now}`]: "Please select a value!",
                },
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
    dropdownResponses,
    shortTextResponses,
    now,
    setErrorMsg,
    handleQuestionNumUpdate,
  ]);
}
