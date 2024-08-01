import classNames from "classnames";
import styles from "./QuestionDropdown.module.css";
import { QuestionDropdownProps } from "./types";

export function QuestionDropdown({
  className,
  children,
}: QuestionDropdownProps) {
  return (
    <div className={classNames(styles["dropdown-select__options"], className)}>
      {children}
    </div>
  );
}
