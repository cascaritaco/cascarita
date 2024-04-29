import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import styles from "./Search.module.css";

const Search = () => {
  return (
    <TextField.Root className={styles.search} placeholder="Search" size="1">
      <TextField.Slot className={styles["search-icon"]}>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};
export default Search;
