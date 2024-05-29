import React, { useState, useEffect } from "react";
import styles from "./LanguageDropdown.module.css";
import { changeLanguage } from "../../i18n/config";
import { LanguageDropdownProps } from "./types";
import { useTranslation } from "react-i18next";
import { useAuth } from "../AuthContext/AuthContext";

interface LanguageOption {
  value: string;
  label: string;
}

const languages: LanguageOption[] = [
  { value: "en", label: "option1" },
  { value: "esp", label: "option2" },
];

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  handleSelect,
}) => {
  const { currentUser } = useAuth();
  const { t } = useTranslation("LanguageDropdown");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  useEffect(() => {
    const currLanguage = localStorage.getItem("defaultLanguage");
    if (currLanguage) {
      setSelectedLanguage(currLanguage);
    }
  }, []);

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
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
          <label htmlFor={language.value}>
            {t(language.label as "option1" | "option2")}
          </label>
        </div>
      ))}
    </div>
  );
};

export default LanguageDropdown;
