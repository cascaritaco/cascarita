import React from "react";
import { FieldProps } from "../types";

const PhoneNumber = ({ field }: FieldProps) => {
  return <div>{JSON.stringify(field, null, 2)}</div>;
};

export default PhoneNumber;
