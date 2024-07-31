import { MouseEventHandler, ReactNode } from "react";

export type QuestionDropdownOptionProps = {
  readonly isSelected?: boolean;
  readonly onClick?: MouseEventHandler;
  readonly className?: string;
  readonly children: ReactNode;
};
