import Logo from "../../assets/logo.svg";
import styles from "./TopNav.module.css";
import { Text } from "@radix-ui/themes";
import { TextField, Avatar } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { MdOutlineNotifications } from "react-icons/md";

const SideNav = () => {
  return (
    <div className={styles["top-nav"]}>
      <div className={styles["logo-con"]}>
        <span className={styles.logo}>
          <Logo />
        </span>
        <span className={styles["logo-text"]}>
          <Text>cascarita</Text>
        </span>
      </div>
      <div className={styles["search-alert-con"]}>
        <TextField.Root className={styles.search} placeholder="Search" size="1">
          <TextField.Slot className={styles["search-icon"]}>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <MdOutlineNotifications className={styles.notification} />
        <Avatar fallback="A" className={styles.avatar} />
      </div>
    </div>
  );
};
export default SideNav;
