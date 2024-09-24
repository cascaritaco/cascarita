import React from "react";
import styles from "./SettingsLayout.module.css";

interface SettingsLayoutProps {
  children?: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SettingsLayout;
