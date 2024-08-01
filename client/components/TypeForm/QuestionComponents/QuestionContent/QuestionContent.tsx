import styles from "./QuestionContext.module.css";
import { QuestionContentProps } from "./types";

export function QuestionContent({ children }: QuestionContentProps) {
  return <p className={styles.questionContent}>{children}</p>;
}
