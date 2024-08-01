import styles from "./QuestionHeading.module.css";
import classNames from "classnames";
import { QuestionHeadingProps } from "./types";

export function QuestionHeading({ children, className }: QuestionHeadingProps) {
  return (
    <h1 className={classNames(styles.questionHeading, className)}>
      {children}
    </h1>
  );
}
