import Logo from "./../../assets/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles["logo-container"]}>
      <Logo className={styles.logo} />
    </div>
  );
};

export default Header;
