import { Button } from "@radix-ui/themes";
import styles from "./PrimaryButton.module.css";
import { PrimaryButtonProps } from "./types";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label }) => {
  return <Button className={styles.primary}>{label}</Button>;
};

export default PrimaryButton;
