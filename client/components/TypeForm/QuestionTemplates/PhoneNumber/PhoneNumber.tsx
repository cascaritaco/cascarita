import { useSharedStates } from "../../contexts/SharedContext";
import { useQuestions } from "../../contexts/QuestionContext";
import { QuestionHeading } from "../../QuestionComponents/QuestionHeading/QuestionHeading";
import { QuestionContent } from "../../QuestionComponents/QuestionContent/QuestionContent";
import { QuestionNavigation } from "../../QuestionComponents/QuestionNavigation/QuestionNavigation";
import { QuestionInputText } from "../../QuestionComponents/QuestionInputText/QuestionInputText";
import { ChangeEventHandler } from "react";
import { SET_PHONE_NUMBER } from "../../reducers/actions/questionsActions";

export function PhoneNumber() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  console.log("STATE: ", state);
  console.log("DISPATCH FUNCTION: ", dispatch);

  const errorMsg = error.phoneNumber ?? "";
  const { phoneNumber } = state;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log("Inside handleInputChange: ", errorMsg, phoneNumber);
    errorMsg &&
      //   setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.phoneNumber;
        console.log("Inside the setErrorMsg");
        return prevValue;
      });

    console.log("handling the dispatch", event.target.value);
    dispatch({ type: SET_PHONE_NUMBER, payload: event.target.value });
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
      <QuestionNavigation showPressEnter={true} onClick={handleOkClick}>
        Next
      </QuestionNavigation>
    </>
  );
}
