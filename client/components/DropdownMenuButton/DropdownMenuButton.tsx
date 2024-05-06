import { Button } from "@radix-ui/themes";
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
  const handleButtonClick = () => {};

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="soft" onClick={handleButtonClick}>
            <SlOptions />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles.options}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator className={styles.separator} />
          <DropdownMenuItem>Delete</DropdownMenuItem>
          <DropdownMenuSeparator className={styles.separator} />
          <DropdownMenuItem>More</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuButton;
