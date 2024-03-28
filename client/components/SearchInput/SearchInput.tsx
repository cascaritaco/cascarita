import styles from "./SearchInput.module.css";
import { ChangeEventHandler, KeyboardEventHandler } from "react";

interface SearchInputProps {
  search: string;
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, onSearch }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onSearch(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key == "Enter") {
      onSearch(e.currentTarget.value);
      console.log(search);
    }
  };

  return (
    <div className={styles["input-icons"]}>
      <i className="fa fa-search icon"></i>
      <input
        type="text"
        placeholder="Search for..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
