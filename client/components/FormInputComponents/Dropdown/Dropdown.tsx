import React from "react";
import { FieldProps } from "../types";

const Dropdown = ({ field }: FieldProps) => {
  return <div>{JSON.stringify(field, null, 2)}</div>;
};

export default Dropdown;
