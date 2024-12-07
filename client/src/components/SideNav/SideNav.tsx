import styles from "./SideNav.module.css";
import { SideNavProps } from "./types";
import { RiHomeLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
// import { MdOutlineCalendarToday } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import LogoutButton from "../LogoutButton/LogoutButton";
import NavItem from "../NavItem/NavItem";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { useAuth0 } from "@auth0/auth0-react";
import { HomePageLogoIcon } from "../../assets/Icons";
import AvatarMenu from "../AvatarMenu/AvatarMenu";

const SideNav: React.FC<SideNavProps> = ({ selectedItem, setSelectedItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("SideNav");
  const { user } = useAuth0();

  useEffect(() => {
    const currentPath = location.pathname.substring(1); // Remove the leading '/'
    setSelectedItem(currentPath);
  }, [location.pathname, setSelectedItem]);

  const handleItemClick = (labelType: string) => {
    let newRoute = "/";
    switch (labelType) {
      case "item1":
        newRoute = "";
        break;
      case "item2":
        newRoute = "users";
        break;
      case "item4":
        newRoute = "forms";
        break;
      case "item5":
        newRoute = "settings";
        break;
      default:
        newRoute = "/";
    }
    setSelectedItem(newRoute);
    navigate(`/${newRoute}`);
  };

  return (
    <nav className={styles.sidenav}>
      <div className={styles["logo-con"]}>
        <span className={styles.logo}>
          <HomePageLogoIcon />
        </span>
        <span className={styles["logo-text"]}>
          <Text>cascarita</Text>
        </span>
      </div>
      <ul>
        <NavItem
          icon={<RiHomeLine />}
          label={t("item1")}
          labelType="item1"
          selected={selectedItem === "" || selectedItem.includes("season")}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<FiUser />}
          label={t("item2")}
          labelType="item2"
          selected={selectedItem === "users"}
          onItemClick={handleItemClick}
        />
        {/* NOTE: UNCOMMENT ONCE SCHEDULING ADDED
          <NavItem
          icon={<MdOutlineCalendarToday />}
          label={t("item3")}
          labelType="item3"
          selected={selectedItem === "schedule"}
          onItemClick={handleItemClick}
        /> */}
        <NavItem
          icon={<HiOutlinePencilAlt />}
          label={t("item4")}
          labelType="item4"
          selected={selectedItem.includes("forms")}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<IoSettingsOutline />}
          label={t("item5")}
          labelType="item5"
          selected={selectedItem.includes("settings")}
          onItemClick={handleItemClick}
        />
      </ul>
      <div className={styles.avatarCard}>
        <AvatarMenu />
      </div>
      {/* <div>
        <LogoutButton icon={<TbLogout />} label={t("item6")} />
      </div> */}
    </nav>
  );
};

export default SideNav;
