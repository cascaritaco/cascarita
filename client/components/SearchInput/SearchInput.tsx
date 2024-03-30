import styles from "./SearchInput.module.css";
import { ChangeEventHandler, KeyboardEventHandler } from "react";
import { SearchInputProps } from "./types";

const SearchInput: React.FC<SearchInputProps> = ({ search, onSearch }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onSearch(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key == "Enter") {
      onSearch(e.currentTarget.value);
    }
  };

  return (
    <div className={styles["input-icons"]}>
      <i className="fa fa-search icon"></i>
      <input
        type="text"
        placeholder="Search for..."
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
