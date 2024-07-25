export type QuestionType = "intro" | `phoneNumber${number}`;

export type QuestionProps = {
  readonly inView: boolean;
  readonly inViewSlide: "up" | "down" | "";
  readonly outView: boolean;
  readonly outViewSlide: "up" | "down" | "";
  readonly isRendered?: boolean;
  readonly type: QuestionType;
};
