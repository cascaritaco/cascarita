import { ChangeEvent } from "react";
import styles from "./CustomDropdown.module.css";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string;
  size: string;
  options: Option[];
  selectedOption: string;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  size,
  options,
  selectedOption,
  onChange,
}) => {
  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const dropdownSize = `${styles["dropdown-options"]} ${
    styles["dropdown-" + size]
  }`;

  return (
    <div className={styles["dropdown-container"]}>
      <label className={styles["dropdown-label"]}>{label}</label>
      <select
        className={dropdownSize}
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
