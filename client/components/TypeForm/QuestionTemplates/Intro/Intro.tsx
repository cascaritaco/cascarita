import { useSharedStates } from "../../contexts/SharedContext";
import { QuestionHeading } from "../../QuestionComponents/QuestionHeading/QuestionHeading";
import { QuestionContent } from "../../QuestionComponents/QuestionContent/QuestionContent";
import { QuestionNavigation } from "../../QuestionComponents/QuestionNavigation/QuestionNavigation";

export function Intro() {
  const { handleOkClick } = useSharedStates();

  return (
    <>
      <QuestionHeading>Up-skilling requires time commitment</QuestionHeading>
      <QuestionContent>
        The GrowthX experience is designed by keeping in mind the working hours
        founders &amp; full time operators typically work in.
        <br />
        <br />
        You will spend
        <br />- 6 hours/week for the first 5 weeks
        <br />- 15 hours/week for the last 3 weeks
      </QuestionContent>
      <QuestionNavigation showPressEnter={true} onClick={handleOkClick}>
        I agree
      </QuestionNavigation>
    </>
  );
}
