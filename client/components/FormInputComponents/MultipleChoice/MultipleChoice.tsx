import React from "react";
import { FieldProps } from "../types";

const MultipleChoice = ({ field }: FieldProps) => {
  return <div>{JSON.stringify(field, null, 2)}</div>;
};

export default MultipleChoice;
