import styles from "./Leagues.module.css";
import Search from "../../components/Search/Search";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import Page from "../../components/Page/Page";

const Leagues = () => {
  // note this needs to be replaced with backend call
  const leagues = [
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
  ];

  return (
    <Page>
      <h1 className={styles.h1}>Leagues</h1>
      <div className={styles["filter-search"]}>
        <div className={styles.dropdown}>
          <Search />
          <p>DropDown1</p>
          <p>DropDown2</p>
        </div>
        <PrimaryButton label="Add League" />
      </div>
      <div className={styles.cols}>
        <h3>Name</h3>
        <h3>Options</h3>
      </div>
      <div className={styles.table}>
        <div>
          {leagues.map((league, index) => (
            <div className={styles.cols} key={index}>
              <p>{league}</p>
              <DropdownMenuButton />
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Leagues;
