import { useSharedStates } from "../contexts/SharedContext";
import { useQuestions } from "../contexts/QuestionContext";
// import { isNotValidEmail, isTaskSpecificEmail } from "@/utils";
import { useEffect } from "react";

export function useHandleKeypress() {
  const { questionNum, setErrorMsg, handleQuestionNumUpdate } =
    useSharedStates();

  const { now } = questionNum;
  const { state } = useQuestions();
  const { phoneNumbers, shortTextResponses, industry, role, goals, email } =
    state;

  console.log("Inside useHandleKeyPress Hook", now, state);

  useEffect(() => {
    function handleKeypress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        event.preventDefault();

        //TODO ADD IF CONDITION TO CHECK IF PHONE NUMBERS IS INCORRECT
        // if (now + 1 === 2 && phoneNumbers === {}) {
        //   setErrorMsg((prevValue) => ({
        //     ...prevValue,
        //     phoneNumber: "Please fill this in",
        //   }));
        //   return;
        // if (now + 1 === 3 && lastName === "") {
        //   setErrorMsg((prevValue) => ({
        //     ...prevValue,
        //     lastName: "Please fill this in",
        //   }));
        //   return;
        //}
        if (now + 1 === 4 && industry === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            industry: "Oops! Please make a selection",
          }));
          return;
        } else if (now + 1 === 5 && role === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            role: "Oops! Please make a selection",
          }));
          return;
        } else if (now + 1 === 6 && goals.length === 0) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            goals: "Oops! Please make a selection",
          }));
          return;
        } else if (now + 1 === 6 && goals.length === 1) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            goals: "Please select more choices",
          }));
          return;
        } else if (now + 1 === 7 && email === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            email: "Please fill this in",
          }));
          return;
        } else if (now + 1 === 7 && email && true) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            email: "Hmm... that email doesn't look right",
          }));
          return;
        } else if (now + 1 === 7 && email) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            email: "Hmm... task specific emails are not allowed",
          }));
          return;
        }

        handleQuestionNumUpdate();
      }
    }

    document.addEventListener("keypress", handleKeypress);

    return function () {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [phoneNumbers, industry, shortTextResponses, now, role, goals, email]);
}
