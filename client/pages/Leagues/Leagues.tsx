import React from "react";
import Page from "../../components/Page/Page";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import LeagueForm from "../../components/Forms/LeagueForm/LeagueForm";
import Modal from "../../components/Modal/Modal";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Search from "../../components/Search/Search";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import styles from "./Leagues.module.css";

const Leagues = () => {
  const [filter, setFilter] = React.useState("");
  const [sorts, setSorts] = React.useState("");

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

  const filterStatuses = ["Active", "Inactive"];
  const sortStatuses = ["Alphabetical", "Date"];

  const [open, setOpen] = React.useState(false);

  return (
    <Page>
      <h1 className={styles.h1}>Leagues</h1>
      <div className={styles.filterSearch}>
        <div className={styles.dropdown}>
          <Search />
          <div className={styles.filterContainer}>
            <p className={styles.filterSubTitle}>Filter</p>
            <SelectMenu
              placeholder="Active"
              name="filter"
              value={filter}
              onValueChange={(value) => setFilter(value)}
            >
              <SelectMenu.Group>
                {filterStatuses.map((status, idx) => (
                  <SelectMenu.Item key={idx} value={status}>
                    {status}
                  </SelectMenu.Item>
                ))}
              </SelectMenu.Group>
            </SelectMenu>
          </div>
          <div className={styles.filterContainer}>
            <p className={styles.filterSubTitle}>Sort By</p>
            <SelectMenu
              placeholder="Alphabetical"
              name="sorts"
              value={sorts}
              onValueChange={(value) => setSorts(value)}
            >
              <SelectMenu.Group>
                {sortStatuses.map((status, idx) => (
                  <SelectMenu.Item key={idx} value={status}>
                    {status}
                  </SelectMenu.Item>
                ))}
              </SelectMenu.Group>
            </SelectMenu>
          </div>
        </div>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Button asChild className={styles.btn}>
            <PrimaryButton
              label="Add League"
              onClick={() => setOpen(true)}
            ></PrimaryButton>
          </Modal.Button>
          <Modal.Content title="Create League">
            <LeagueForm afterSave={() => setOpen(false)} />
          </Modal.Content>
        </Modal>
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
