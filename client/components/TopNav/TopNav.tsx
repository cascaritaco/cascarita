import Logo from "../../assets/logo.svg";
import styles from "./TopNav.module.css";
import { Text } from "@radix-ui/themes";
import { Avatar } from "@radix-ui/themes";
import { MdOutlineNotifications } from "react-icons/md";
import Search from "../Search/Search";

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
        <Search />
        <MdOutlineNotifications className={styles.notification} />
        <Avatar fallback="A" className={styles.avatar} />
      </div>
    </div>
  );
};
export default SideNav;
