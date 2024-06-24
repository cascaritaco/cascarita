import styles from "./Layout.module.css";
import { LayoutProps } from "./types";
import TopNav from "../TopNav/TopNav";
import SideNav from "../SideNav/SideNav";
import { useState } from "react";
import { blackListRoutes } from "./blacklist";
import { useAuth } from "../AuthContext/AuthContext";
import { matchPath } from "../../util/matchPath";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [selectedItem, setSelectedItem] = useState("home");

  const isBlacklisted = blackListRoutes.some((pattern) =>
    matchPath(window.location.pathname, pattern),
  );

  return (
    <div>
      {!isBlacklisted && currentUser ? (
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
