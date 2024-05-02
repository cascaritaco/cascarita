import React from "react";
import Page from "../../components/Page/Page";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import LeagueForm from "../../components/Forms/LeagueForm/LeagueForm";
import Modal from "../../components/Modal/Modal";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Search from "../../components/Search/Search";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import { LeagueResponse } from "../../api/types";
import styles from "./Leagues.module.css";

const Leagues = () => {
  const [leagues, setLeagues] = React.useState<LeagueResponse[]>([]);
  const [filter, setFilter] = React.useState("");
  const [sorts, setSorts] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/league/1");
      result.json().then((data) => setLeagues(data.data));
    };
    fetchData();
  }, []);

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
          {leagues == undefined ? (
            <div className={styles.cols}>
              <p> No Leagues </p>
            </div>
          ) : (
            leagues?.map((league) => (
              <div className={styles.cols} key={league.id}>
                <p>{league.name}</p>
                <DropdownMenuButton />
              </div>
            ))
          )}
        </div>
      </div>
    </Page>
  );
};

export default Leagues;
