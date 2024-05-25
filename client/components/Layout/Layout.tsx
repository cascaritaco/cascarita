import styles from "./Layout.module.css";
import { LayoutProps } from "./types";
import TopNav from "../TopNav/TopNav";
import SideNav from "../SideNav/SideNav";
import { useState } from "react";
import { blackListRoutes } from "./blacklist";
// import { useAuth } from "../AuthContext/AuthContext";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentUser = "test";
  const [selectedItem, setSelectedItem] = useState("home");
  return (
    <div>
      {!blackListRoutes.includes(window.location.pathname) && currentUser ? (
        <div>
          <TopNav />
          <SideNav
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <div className={styles.main}>{children}</div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default Layout;
