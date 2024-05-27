import React, { useState } from "react";
import styles from "./LanguageDropdown.module.css";
import { changeLanguage } from "../../i18n/config";
import { LanguageDropdownProps } from "./types";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("LanguageDropdown");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await changeLanguage(event.target.value);
    await setSelectedLanguage(event.target.value);
    //TODO make the call to the backend to change the selectedLanguage
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
