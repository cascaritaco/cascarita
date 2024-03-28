import SideNav from "../SideNav/SideNav";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.dash}>
      <SideNav />
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Layout;
