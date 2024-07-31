import { useSharedStates } from "../../contexts/SharedContext";
import { useQuestions } from "../../contexts/QuestionContext";
import { QuestionHeading } from "../../QuestionComponents/QuestionHeading/QuestionHeading";
import { QuestionContent } from "../../QuestionComponents/QuestionContent/QuestionContent";
import { QuestionNavigation } from "../../QuestionComponents/QuestionNavigation/QuestionNavigation";
import { QuestionInputText } from "../../QuestionComponents/QuestionInputText/QuestionInputText";
import { ChangeEventHandler } from "react";

type PhoneNumberProps = {
  index: number;
  type: string;
};

export function PhoneNumber({ type, index }: PhoneNumberProps) {
  const {
    errorMsg: error,
    setErrorMsg,
    handleOkClick,
    handleBackClick,
    totalQuestions,
  } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.phoneNumber ?? "";
  const phoneNumber = state.phoneNumbers[type] || "";

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.phoneNumber;
        return prevValue;
      });

    dispatch({
      type: "SET_PHONE_NUMBER",
      payload: { type: type, value: event.target.value },
    });
  };

  return (
    <>
      <QuestionHeading>Heading</QuestionHeading>
      <QuestionContent>Content</QuestionContent>
      <QuestionInputText
        placeholder="Type your answer here..."
        value={phoneNumber}
        onChange={handleInputChange}
      />
      {/* {errorMsg && <Error message={errorMsg} />} */}
      <QuestionNavigation
        isFinal={index + 1 === totalQuestions}
        onBackClick={handleBackClick}
        showPressEnter={true}
        onClick={handleOkClick}>
        Next
      </QuestionNavigation>
    </>
  );
}
