import styles from "./Button.module.css";

const SecondaryButton = ({ label = "text", size = "medium" }) => {
  const buttonClassName = `${styles["secondary-button"]} ${styles[size]}`;

  return <button className={buttonClassName}>{label}</button>;
};

export default SecondaryButton;
