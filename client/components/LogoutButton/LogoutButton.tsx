import { Button } from "@radix-ui/themes";
import { LogoutButtonProps } from "./types";
import styles from "./LogoutButton.module.css";

const LogoutButton: React.FC<LogoutButtonProps> = ({ icon, label }) => {
  return (
    <Button
      onClick={() => console.log("Log off")}
      variant="soft"
      className={styles.button}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </Button>
  );
};
export default LogoutButton;
