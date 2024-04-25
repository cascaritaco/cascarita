import React from "react";
import styles from "./Radio.module.css";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Select } from "@radix-ui/react-select";

interface RadioProps {
  children: React.ReactNode;
  groupName: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
}

interface RadioItemProp {
  value: string;
  id: string;
}

const Radio: React.FC<RadioProps> & {
  Item: React.FC<RadioItemProp>;
  Indicator: typeof RadioGroup.Indicator;
} = ({ children, value, groupName, onValueChange, required = false }) => {
  return (
    <RadioGroup.Root
      name={groupName}
      value={value}
      onValueChange={onValueChange}
      required={required}
    >
      {children}
    </RadioGroup.Root>
  );
};

const RadioItem: React.FC<RadioItemProp> = ({ value, id }) => {
  return (
    <RadioGroup.Item value={value} id={id} className={styles.radioGroupItem}>
      <RadioGroup.Indicator className={styles.radioGroupIndicator} />
    </RadioGroup.Item>
  );
};

Radio.Item = RadioItem;
Radio.Indicator = RadioGroup.Indicator;
export default Radio;
