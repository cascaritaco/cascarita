import { useState } from "react";
import styles from "./SideNav.module.css";
import Logo from "./../../assets/logo.svg";
import SearchInput from "../SearchInput/SearchInput";
import NavButton from "../NavButton/NavButton";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Users", "Calendar", "Settings"];

export default function SideNav() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <nav className={styles.sidenav}>
      <div className={styles["logo-con"]} onClick={() => navigate("/")}>
        <Logo className={styles.logo} />
        <p className={styles["logo-text"]}>cascarita</p>
      </div>
      <SearchInput search={search} onSearch={setSearch} />
      <ul>
        {pages.map((item) => (
          <li key={item}>
            <NavButton label={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
