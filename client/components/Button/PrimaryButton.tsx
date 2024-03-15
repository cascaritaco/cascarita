import styles from "./Button.module.css";

const PrimaryButton = ({ label = "text", size = "medium" }) => {
  const buttonClassName = `${styles["primary-button"]} ${styles[size]}`;

  return <button className={buttonClassName}>{label}</button>;
};

export default PrimaryButton;
