import { useSharedStates } from "../../contexts/SharedContext";
import { QuestionHeading } from "../../QuestionComponents/QuestionHeading/QuestionHeading";
import { QuestionContent } from "../../QuestionComponents/QuestionContent/QuestionContent";
import { QuestionNavigation } from "../../QuestionComponents/QuestionNavigation/QuestionNavigation";
import { QuestionTemplateProps } from "../types";

export function Intro({ data, index }: QuestionTemplateProps) {
  const { handleOkClick, totalQuestions } = useSharedStates();

  return (
    <>
      <QuestionHeading>{data.title}</QuestionHeading>
      <QuestionContent>{data.description}</QuestionContent>
      <QuestionNavigation
        isFinal={index + 1 === totalQuestions}
        showPressEnter={true}
        onClick={handleOkClick}>
        Start Survey
      </QuestionNavigation>
    </>
  );
}
