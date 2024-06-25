import React from "react";
import { FieldProps } from "../types";

const LongText = ({ field }: FieldProps) => {
  return <div>{JSON.stringify(field, null, 2)}</div>;
};

export default LongText;
