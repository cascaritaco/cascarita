import React from "react";
import styles from "./Radio.module.css";
import * as RadioGroup from "@radix-ui/react-radio-group";

interface RadioProps {
  children: React.ReactNode;
  groupName: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

interface RadioItemProp {
  value: string;
  id: string;
  disabled?: boolean;
  required?: boolean;
}

const Radio: React.FC<RadioProps> & {
  Item: React.FC<RadioItemProp>;
  Indicator: typeof RadioGroup.Indicator;
} = ({
  children,
  value,
  defaultValue,
  groupName,
  onValueChange,
  required = false,
  disabled = false,
}) => {
  return (
    <RadioGroup.Root
      name={groupName}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      required={required}
      disabled={disabled}
      className={styles.radioGroupRoot}
    >
      {children}
    </RadioGroup.Root>
  );
};

const RadioItem: React.FC<RadioItemProp> = ({
  value,
  id,
  required = false,
  disabled = false,
}) => {
  return (
    <RadioGroup.Item
      value={value}
      id={id}
      required={required}
      disabled={disabled}
      className={styles.radioGroupItem}
    >
      <RadioGroup.Indicator className={styles.radioGroupIndicator} />
    </RadioGroup.Item>
  );
};

Radio.Item = RadioItem;
Radio.Indicator = RadioGroup.Indicator;
export default Radio;
