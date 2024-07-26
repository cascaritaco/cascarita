import { useSharedStates } from "../../contexts/SharedContext";
import { useQuestions } from "../../contexts/QuestionContext";
// import { QuestionHeading } from "../../QuestionComponents/QuestionHeading/QuestionHeading";
import { QuestionContent } from "../../QuestionComponents/QuestionContent/QuestionContent";
import { QuestionNavigation } from "../../QuestionComponents/QuestionNavigation/QuestionNavigation";
import { QuestionInputText } from "../../QuestionComponents/QuestionInputText/QuestionInputText";
import { ChangeEventHandler } from "react";
import { QuestionTemplateProps } from "../types";
import { SET_SHORT_TEXT_RESPONSE } from "../../reducers/actions/questionsActions";

export function ShortText({ type, data }: QuestionTemplateProps) {
  const {
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
      //   setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.shortTextResponse;
        return prevValue;
      });

    dispatch({
      type: SET_SHORT_TEXT_RESPONSE,
      payload: { type: type, value: event.target.value },
    });
  };

  return (
    <>
      {/* <QuestionHeading>Heading</QuestionHeading> */}
      <QuestionContent>{data.title}</QuestionContent>
      <QuestionInputText
        placeholder="Type your response here..."
        value={shortTextResponse}
        onChange={handleInputChange}
      />
      {/* {errorMsg && <Error message={errorMsg} />} */}
      <QuestionNavigation
        onBackClick={handleBackClick}
        showPressEnter={true}
        onClick={handleOkClick}>
        Next
      </QuestionNavigation>
    </>
  );
}
