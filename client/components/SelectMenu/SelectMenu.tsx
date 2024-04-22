import React from "react";
import styles from "./SelectMenu.module.css";

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export default function SelectMenu({
  open,
  onOpenChange,
  value,
  name,
  onValueChange,
  placeholder,
  children,
  ...delegated
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  name?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  delegated?: React.HTMLProps<HTMLDivElement>;
}) {
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
}

function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Select.Item className={styles.selectItem} value={value}>
      <Select.ItemText>{children}</Select.ItemText>

      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

SelectMenu.Button = Select.Trigger;
SelectMenu.Group = Select.Group;
SelectMenu.GroupLabel = Select.Label;
SelectMenu.Separator = Select.Separator;
SelectMenu.Item = SelectItem;
