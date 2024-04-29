import styles from "./SideNav.module.css";
import { SideNavProps } from "./types";
import { RiHomeLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import LogoutButton from "../LogoutButton/LogoutButton";
import NavItem from "../NavItem/NavItem";
import { useNavigate } from "react-router-dom";

const SideNav: React.FC<SideNavProps> = ({ selectedItem, setSelectedItem }) => {
  const navigate = useNavigate();

  const handleItemClick = (label: string) => {
    setSelectedItem(label);
    navigate(`/${label.toLowerCase()}`);
  };

  return (
    <nav className={styles.sidenav}>
      <ul>
        <NavItem
          icon={<RiHomeLine />}
          label="Home"
          selected={selectedItem === "Home"}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<FiUser />}
          label="Users"
          selected={selectedItem === "Users"}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<MdOutlineCalendarToday />}
          label="Schedule"
          selected={selectedItem === "Schedule"}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<HiOutlinePencilAlt />}
          label="Forms"
          selected={selectedItem === "Forms"}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<IoSettingsOutline />}
          label="Settings"
          selected={selectedItem === "Settings"}
          onItemClick={handleItemClick}
        />
      </ul>
      <div>
        <LogoutButton icon={<TbLogout />} label="Logout" />
      </div>
    </nav>
  );
};
export default SideNav;
