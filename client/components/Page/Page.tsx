import styles from "./Page.module.css";
import { PageProps } from "./types";

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};

export default Page;
