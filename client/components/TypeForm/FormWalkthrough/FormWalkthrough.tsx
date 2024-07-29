import { useSharedStates } from "../contexts/SharedContext";
import { useHandleKeypress } from "../hooks/useHandleKeyPress";
import { Question } from "../Question/Question";
import { useQuestionsData } from "./useQuestionsData";
import { FormQuestionProps } from "./types";

export function FormWalkthrough({ data }: FormQuestionProps) {
  const questions = useQuestionsData(data);
  const { questionNum } = useSharedStates();
  const { prev, now } = questionNum;

  useHandleKeypress(questions);

  return (
    <section>
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
  );
}
