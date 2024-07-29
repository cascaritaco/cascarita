import { useSharedStates } from "../../contexts/SharedContext";
import { useQuestions } from "../../contexts/QuestionContext";
import { QuestionContent } from "../../QuestionComponents/QuestionContent/QuestionContent";
import { QuestionNavigation } from "../../QuestionComponents/QuestionNavigation/QuestionNavigation";
import { QuestionInputText } from "../../QuestionComponents/QuestionInputText/QuestionInputText";
import { Error } from "../../QuestionComponents/Error/Error";
import { ChangeEventHandler } from "react";
import { QuestionTemplateProps } from "../types";
import styles from "./ShortText.module.css";
import { SET_SHORT_TEXT_RESPONSE } from "../../reducers/actions/questionsActions";

export function ShortText({ type, data, index }: QuestionTemplateProps) {
  const {
    totalQuestions,
    errorMsg: error,
    setErrorMsg,
    handleOkClick,
    handleBackClick,
  } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.shortTextResponses ?? "";
  const shortTextResponse = state.shortTextResponses[type] || "";

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.shortTextResponses;
        return prevValue;
      });

    dispatch({
      type: SET_SHORT_TEXT_RESPONSE,
      payload: { type: type, value: event.target.value },
    });
  };

  const hasError = () => {
    return (
      typeof errorMsg === "object" &&
      errorMsg !== null &&
      Object.keys(errorMsg).includes(type)
    );
  };

  return (
    <>
      <QuestionContent>
        {data.title}
        {data.validations?.required && (
          <span className={styles.asterisk}>*</span>
        )}
      </QuestionContent>
      <QuestionInputText
        placeholder="Type your response here..."
        value={shortTextResponse}
        onChange={handleInputChange}
      />
      {hasError() && (
        <Error message={(errorMsg as { [key: string]: string })[type]} />
      )}
      {errorMsg === "" && (
        <QuestionNavigation
          isFinal={index + 1 === totalQuestions}
          onBackClick={handleBackClick}
          showPressEnter={true}
          onClick={handleOkClick}>
          Next
        </QuestionNavigation>
      )}
    </>
  );
}
