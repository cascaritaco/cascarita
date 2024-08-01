import { QuestionProps } from "./types";
import classNames from "classnames";
import styles from "./Question.module.css";
import { Intro } from "../QuestionTemplates/Intro/Intro";
import { ShortText } from "../QuestionTemplates/ShortText/ShortText";
import { Dropdown } from "../QuestionTemplates/Dropdown/Dropdown";

export function Question({
  inView,
  inViewSlide,
  outView,
  outViewSlide,
  isRendered,
  type,
  data,
  index,
}: QuestionProps) {
  return (
    <div
      className={classNames(styles["question-box"], {
        [styles["slide-out"]]: outView,
        [styles["slide-in"]]: inView,
        [styles["out-view__up"]]: outViewSlide === "up",
        [styles["out-view__down"]]: outViewSlide === "down",
        [styles["in-view__up"]]: inViewSlide === "up",
        [styles["in-view__down"]]: inViewSlide === "down",
        [styles["rendered"]]: isRendered,
      })}>
      {type === "intro" && <Intro type="intro" data={data} index={index} />}
      {type.startsWith("shortTextResponse") && (
        <ShortText type={type} data={data} index={index} />
      )}
      {type.startsWith("dropdown") && (
        <Dropdown type={type} data={data} index={index} />
      )}
    </div>
  );
}
