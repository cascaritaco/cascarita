import { Button } from "@radix-ui/themes";
import { LogoutButtonProps } from "./types";
import styles from "./LogoutButton.module.css";
// import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const LogoutButton: React.FC<LogoutButtonProps> = ({ icon, label }) => {
  // const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <Button onClick={handleLogout} variant="soft" className={styles.button}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </Button>
  );
};
export default LogoutButton;
