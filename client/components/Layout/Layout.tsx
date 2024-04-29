import styles from "./Layout.module.css";
import { LayoutProps } from "./types";
import TopNav from "../TopNav/TopNav";
import SideNav from "../SideNav/SideNav";

const Layout: React.FC<LayoutProps> = ({
  children,
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div>
      <TopNav />
      <SideNav selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Layout;
