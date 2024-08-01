import { useSharedStates } from "../contexts/SharedContext";
import { useHandleKeypress } from "../hooks/useHandleKeyPress";
import { Question } from "../Question/Question";
import { useQuestionsData } from "./useQuestionsData";
import { useQuestions } from "../contexts/QuestionContext";
import { FormQuestionProps } from "./types";
import { ProgressBar } from "../QuestionComponents/ProgressBar/ProgressBar";
import styles from "./FormWalkthrough.module.css";

export function FormWalkthrough({ data }: FormQuestionProps) {
  const questions = useQuestionsData(data);
  const { percent } = useQuestions();
  const { questionNum } = useSharedStates();
  const { prev, now } = questionNum;

  useHandleKeypress(questions);

  return (
    <>
      <ProgressBar width={percent} />
      <section className={styles.section}>
        <div>
          {questions.map((question, index) => {
            const isVisible = index === now;

            return (
              isVisible && (
                <Question
                  key={question.index}
                  type={question.type}
                  data={data[index]}
                  index={index}
                  outView={now - 1 === index || now > index + 1}
                  outViewSlide={now - 1 === index ? "up" : "down"}
                  inView={now === index}
                  inViewSlide={prev === index + 1 ? "down" : "up"}
                  isRendered={prev === null && index === 0}
                />
              )
            );
          })}
        </div>
      </section>
    </>
  );
}
