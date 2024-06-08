import styles from "./Page.module.css";
import { PageProps } from "./types";

const Page: React.FC<PageProps> = ({ children }) => {
  return <section className={styles.page}>{children}</section>;
};

export default Page;
