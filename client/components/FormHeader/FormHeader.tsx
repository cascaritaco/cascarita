import React from "react";
import Logo from "../../assets/logo.svg";
import styles from "./FormHeader.module.css";
import { Text } from "@radix-ui/themes";

function FormHeader() {
  return (
    <header className={styles.topNav}>
      <div className={styles.logoCon}>
        <span className={styles.logo}>
          <Logo />
        </span>
        <span className={styles.logoText}>
          <Text>cascarita</Text>
        </span>
      </div>
    </header>
  );
}

export default FormHeader;
