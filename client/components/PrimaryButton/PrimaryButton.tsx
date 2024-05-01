// PrimaryButton.tsx
import React from "react";
import { Button } from "@radix-ui/themes";
import styles from "./PrimaryButton.module.css";
import { PrimaryButtonProps } from "./types";

const PrimaryButton: React.FC<PrimaryButtonProps & { onClick: () => void }> = ({
  label,
  onClick,
}) => {
  return (
    <Button className={styles.primary} onClick={onClick}>
      {label}
    </Button>
  );
};

export default PrimaryButton;
