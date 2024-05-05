import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SlOptions } from "react-icons/sl";
import styles from "./DropdownMenuButton.module.css";

const DropdownMenuButton = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SlOptions />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles.options}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator className={styles.seperator} />
          <DropdownMenuItem>Delete</DropdownMenuItem>
          <DropdownMenuSeparator className={styles.seperator} />
          <DropdownMenuItem>More</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DropdownMenuButton;
