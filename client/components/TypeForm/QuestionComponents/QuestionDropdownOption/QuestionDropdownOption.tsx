import classNames from "classnames";
import styles from "./QuestionDropdownOption.module.css";
import { QuestionDropdownOptionProps } from "./types";
import { FaCheckCircle } from "react-icons/fa";

export function QuestionDropdownOption({
  isSelected,
  onClick,
  className,
  children,
}: QuestionDropdownOptionProps) {
  return (
    <span
      className={classNames(styles["dropdown-select__option"], className, {
        [styles["animate"]]: isSelected,
        [styles["selected"]]: isSelected,
      })}
      onClick={onClick}>
      {children}
      {isSelected && <FaCheckCircle />}
    </span>
  );
}
