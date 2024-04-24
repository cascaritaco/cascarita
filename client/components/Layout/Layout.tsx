import styles from "./Layout.module.css";
import { LayoutProps } from "./types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};

export default Layout;
