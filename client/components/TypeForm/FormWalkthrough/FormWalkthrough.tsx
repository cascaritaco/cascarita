import { useSharedStates } from "../contexts/SharedContext";
import { useHandleKeypress } from "../hooks/useHandleKeyPress";
import { Question } from "../Question/Question";
import { QuestionType } from "../Question/types";
import { FormQuestionProps } from "./types";

export function FormWalkthrough({ data }: FormQuestionProps) {
  const { questionNum } = useSharedStates();
  const { prev, now } = questionNum;

  useHandleKeypress();
  //   useHandleScroll();
  // TODO: Add a way to pass through data
  console.log("DATA!!!!!!!!!!!!: ", data);

  const questions: { type: QuestionType; index: number }[] = data.map(
    (field, index) => {
      let type: QuestionType;
      console.log("field: ", field, index);
      if (index === 0) {
        type = "intro";
      } else if (field.type === "short_text") {
        console.log("I AM IN SHORT TEXT");
        type = `shortTextResponse${index}` as QuestionType;
      } else if (field.type === "phone_number") {
        type = `phoneNumber${index}` as QuestionType;
      } else {
        // Handle other types if necessary
        type = `otherType${index}` as QuestionType;
        console.log("error");
      }

      return { type, index };
    },
  );

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
                outView={now - 1 === index || now > index + 1}
                outViewSlide={now - 1 === index ? "up" : "down"}
                inView={now === index}
                inViewSlide={prev === index + 1 ? "down" : "up"}
                isRendered={prev === null && index === 0}
              />
            )
          );
        })}
        {/* <Question
          type="intro"
          outView={now - 1 === 0 || now > 1}
          outViewSlide="up"
          inView={now === 0}
          inViewSlide={prev === 1 ? "down" : ""}
          isRendered={prev === null}
        />

        {[0, 2].includes(prev ?? -1) && [now - 1, now, now + 1].includes(1) && (
          <Question
            type="phoneNumber0"
            outView={[now - 1, now + 1].includes(1)}
            outViewSlide={now - 1 === 1 ? "up" : "down"}
            inView={now === 1}
            inViewSlide={prev === 2 ? "down" : "up"}
          />
        )}

        {[1, 3].includes(prev ?? -1) && [now - 1, now, now + 1].includes(2) && (
          <Question
            type="phoneNumber1"
            outView={[now - 1, now + 1].includes(2)}
            outViewSlide={now - 1 === 2 ? "up" : "down"}
            inView={now === 2}
            inViewSlide={prev === 3 ? "down" : "up"}
          />
        )} */}
      </div>
    </section>
  );
}
