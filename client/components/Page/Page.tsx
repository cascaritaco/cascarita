import BreadCrumb from "../BreadCrumb/BreadCrumb";
import styles from "./Page.module.css";
import { PageProps } from "./types";

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <section className={styles.page}>
      <BreadCrumb />
      {children}
    </section>
  );
};

export default Page;
