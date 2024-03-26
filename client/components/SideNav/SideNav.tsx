import { useState } from "react";
import styles from "./SideNav.module.css";
import Logo from "./../../assets/logo.svg";

export default function SideNav() {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
  };
  return (
    <div className={styles.sidenav}>
      <div className={styles["logo-con"]}>
        <Logo className={styles.logo} />
        <p className={styles["logo-text"]}>cascarita</p>
      </div>
      <div className={styles["input-icons"]}>
        <i className="fa fa-search icon"></i>
        <input
          type="text"
          placeholder="Search for..."
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
        />
      </div>
      <button>Home</button>
      <button>Users</button>
      <button>Team</button>
      <button>League</button>
      <button>Calendar</button>
      <button>Settings</button>
    </div>
  );
}
