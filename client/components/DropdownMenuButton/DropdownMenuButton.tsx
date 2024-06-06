import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SlOptions } from "react-icons/sl";
import styles from "./DropdownMenuButton.module.css";
import { useTranslation } from "react-i18next";
import { DropdownMenuButtonProps } from "./types";

const DropdownMenuButton = ({ onEdit, onDelete }: DropdownMenuButtonProps) => {
  const { t } = useTranslation("DropdownMenuButton");

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SlOptions />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles.options}>
          <DropdownMenuItem onSelect={onEdit}>{t("option1")}</DropdownMenuItem>
          <DropdownMenuSeparator className={styles.seperator} />
          <DropdownMenuItem onSelect={onDelete}>
            {t("option2")}
          </DropdownMenuItem>
          <DropdownMenuSeparator className={styles.seperator} />
          <DropdownMenuItem>{t("option3")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DropdownMenuButton;
