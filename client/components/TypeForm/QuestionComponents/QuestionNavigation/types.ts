import { MouseEventHandler, ReactNode } from "react";

export type QuestionNavigationProps = {
  readonly children: ReactNode;
  readonly showPressEnter: boolean;
  readonly className?: string;
  readonly onClick?: MouseEventHandler;
  readonly onBackClick?: MouseEventHandler;
};
