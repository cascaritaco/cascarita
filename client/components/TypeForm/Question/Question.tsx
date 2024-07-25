import { QuestionProps } from "./types";
import classNames from "classnames";
import { PhoneNumber } from "../QuestionTemplates/PhoneNumber/PhoneNumber";
import styles from "./Question.module.css";
import { Intro } from "../QuestionTemplates/Intro/Intro";

export function Question({
  inView,
  inViewSlide,
  outView,
  outViewSlide,
  isRendered,
  type,
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
      {type === "intro" && <Intro />}
      {type.startsWith("phoneNumber") && <PhoneNumber type={type} />}
      {/* {type === "firstName" && <FirstNameInput />}
      {type === "lastName" && <LastNameInput />}
      {type === "industry" && <IndustryInput />}
      {type === "role" && <RoleInput />}
      {type === "goal" && <GoalInput />}
      {type === "email" && <EmailInput />} */}
    </div>
  );
}
