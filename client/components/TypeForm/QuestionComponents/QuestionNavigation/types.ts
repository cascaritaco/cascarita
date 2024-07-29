import { MouseEventHandler, ReactNode } from "react";

export type QuestionNavigationProps = {
  readonly isFinal: boolean;
  readonly children: ReactNode;
  readonly showPressEnter: boolean;
  readonly className?: string;
  readonly onClick: (isFinal: boolean) => void;
  readonly onBackClick?: MouseEventHandler;
};
