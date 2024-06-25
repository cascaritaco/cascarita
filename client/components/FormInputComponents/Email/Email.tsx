import React from "react";
import { FieldProps } from "../types";

const Email = ({ field }: FieldProps) => {
  return <div>{JSON.stringify(field, null, 2)}</div>;
};

export default Email;
