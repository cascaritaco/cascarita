import { useSharedStates } from "../contexts/SharedContext";
import { useHandleKeypress } from "../hooks/useHandleKeyPress";
import { Question } from "../Question/Question";

export function FormWalkthrough() {
  const { questionNum } = useSharedStates();
  const { prev, now } = questionNum;

  useHandleKeypress();
  //   useHandleScroll();

  return (
    <section>
      <div>
        <Question
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
        )}
      </div>
    </section>
  );
}
