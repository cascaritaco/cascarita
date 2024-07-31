import { useEffect } from "react";
import { QuestionType } from "../Question/types"; // Adjust the path as needed
import { useSharedStates } from "../contexts/SharedContext";
import { FormQuestionProps } from "./types";

export function useQuestionsData(data: FormQuestionProps["data"]) {
  const { setTotalQuestions } = useSharedStates();

  const questions: { type: QuestionType; index: number; required: boolean }[] =
    data.map((field, index) => {
      let type: QuestionType;
      if (index === 0) {
        type = "intro";
      } else if (field.type === "short_text") {
        type = `shortTextResponses${index}` as QuestionType;
      } else if (field.type === "dropdown") {
        type = `dropdownResponses${index}` as QuestionType;
      } else {
        type = `otherType${index}` as QuestionType;
      }
      const required = field.validations?.required === true;
      return { type, index, required };
    });

  useEffect(() => {
    setTotalQuestions(questions.length);
  }, [questions, setTotalQuestions]);

  return questions;
}
