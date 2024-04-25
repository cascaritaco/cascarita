import React from "react";
import styles from "./SelectMenu.module.css";

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface SelectMenu {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  children: React.ReactNode;
  delegated?: React.HTMLProps<HTMLDivElement>;
}

const SelectMenu: React.FC<SelectMenu> & {
  Button: typeof Select.Trigger;
  Group: typeof Select.Group;
  GroupLabel: typeof Select.Label;
  Separator: typeof Select.Separator;
  Item: React.FC<SelectItemProps>;
} = ({
  open,
  onOpenChange,
  value,
  name,
  onValueChange,
  placeholder,
  children,
  ...delegated
}) => {
  return (
    <Select.Root
      open={open}
      onOpenChange={onOpenChange}
      value={value}
      defaultValue=""
      name={name}
      onValueChange={onValueChange}
      {...delegated}
    >
      <Select.Trigger className={styles.selectTrigger}>
        <Select.Value
          placeholder={placeholder ? placeholder : "Select a value"}
        />

        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.selectContent}>
          <Select.ScrollUpButton className={styles.selectScrollButton}>
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className={styles.selectViewport}>
            {children}
          </Select.Viewport>

          <Select.ScrollDownButton>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  return (
    <Select.Item className={styles.selectItem} value={value}>
      <Select.ItemText>{children}</Select.ItemText>

      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

SelectMenu.Button = Select.Trigger;
SelectMenu.Group = Select.Group;
SelectMenu.GroupLabel = Select.Label;
SelectMenu.Separator = Select.Separator;
SelectMenu.Item = SelectItem;
export default SelectMenu;
