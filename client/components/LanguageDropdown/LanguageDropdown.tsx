import React, { useState, useEffect } from "react";
import styles from "./LanguageDropdown.module.css";
import { changeLanguage } from "../../i18n/config";
import { LanguageDropdownProps } from "./types";
import { useAuth } from "../AuthContext/AuthContext";

interface LanguageOption {
  value: string;
  label: string;
}

const languages: LanguageOption[] = [
  { value: "en", label: "English" },
  { value: "esp", label: "Español" },
];

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  handleSelect,
}) => {
  const { currentUser } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  useEffect(() => {
    const currLanguage = localStorage.getItem("defaultLanguage");
    if (currLanguage) {
      setSelectedLanguage(currLanguage);
    }

    const timeout = setTimeout(() => {
      handleSelect();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [handleSelect]);

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (currentUser) {
      await setSelectedLanguage(event.target.value);
      await changeLanguage(currentUser.id, event.target.value);
    }
    handleSelect();
  };

  return (
    <div className={styles.languageDropdown}>
      {languages.map((language) => (
        <div key={language.value}>
          <input
            type="radio"
            id={language.value}
            name="language"
            value={language.value}
            checked={selectedLanguage === language.value}
            onChange={handleLanguageChange}
            className={styles.languagesInput}
          />
          <label htmlFor={language.value}>{language.label}</label>
        </div>
      ))}
    </div>
  );
};

export default LanguageDropdown;
