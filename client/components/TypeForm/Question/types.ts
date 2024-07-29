import { Field } from "../../../pages/FormPage/types";
export type QuestionType =
  | "intro"
  | `phoneNumber${number}`
  | `shortTextResponse${number}`;

export type QuestionProps = {
  readonly index: number;
  readonly inView: boolean;
  readonly inViewSlide: "up" | "down" | "";
  readonly outView: boolean;
  readonly outViewSlide: "up" | "down" | "";
  readonly isRendered?: boolean;
  readonly type: QuestionType;
  readonly data: Field;
};
