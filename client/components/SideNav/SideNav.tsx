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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SideNav: React.FC<SideNavProps> = ({ selectedItem, setSelectedItem }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("SideNav");

  const handleItemClick = (labelType: string) => {
    let route: string;

    switch (labelType) {
      case "item1":
        route = "";
        break;
      case "item2":
        route = "users";
        break;
      case "item4":
        route = "forms";
        break;
      case "item5":
        route = "settings";
        break;
      default:
        route = "/";
    }
    setSelectedItem(route);
    navigate(`/${route}`);
  };

  return (
    <nav className={styles.sidenav}>
      <ul>
        <NavItem
          icon={<RiHomeLine />}
          label={t("item1")}
          labelType="item1"
          selected={selectedItem === ""}
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
          selected={selectedItem === "forms"}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<IoSettingsOutline />}
          label={t("item5")}
          labelType="item5"
          selected={selectedItem === "settings"}
          onItemClick={handleItemClick}
        />
      </ul>
      <div>
        <LogoutButton icon={<TbLogout />} label={t("item6")} />
      </div>
    </nav>
  );
};
export default SideNav;
