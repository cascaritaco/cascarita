import { useState } from "react";
import Page from "../../components/Page/Page";
import LeagueForm from "../../components/Forms/LeagueForm";
import Modal from "../../components/Modal/Modal";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Search from "../../components/Search/Search";
// import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
// import { LeagueType } from "../../api/teams/types";
// import { useQuery } from "@tanstack/react-query";
import styles from "./Leagues.module.css";
import { useTranslation } from "react-i18next";

const Leagues = () => {
  const { t } = useTranslation("Leagues");

  const [filter, setFilter] = useState("");
  const [sorts, setSorts] = useState("");

  const [open, setOpen] = useState(false);
  // const leaguesQuery = useQuery({
  //   queryKey: ["leagues"],
  //   queryFn: () => fetch("/api/league/1").then((res) => res.json()),
  // });
  const filterStatuses = [t("filterOptions.item1"), t("filterOptions.item2")];
  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];

  return (
    <Page>
      <h1 className={styles.h1}>{t("title")}</h1>
      <div className={styles.filterSearch}>
        <div className={styles.dropdown}>
          <Search />
          <div className={styles.filterContainer}>
            <p className={styles.filterSubTitle}>{t("filter")}</p>
            <SelectMenu
              placeholder={t("filterOptions.item1")}
              name="filter"
              value={filter}
              onValueChange={(value) => setFilter(value)}>
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
            <p className={styles.filterSubTitle}>{t("sort")}</p>
            <SelectMenu
              placeholder={t("sortOptions.item1")}
              name="sorts"
              value={sorts}
              onValueChange={(value) => setSorts(value)}>
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
              onClick={() => setOpen(true)}></PrimaryButton>
          </Modal.Button>
          <Modal.Content title="Create League">
            <LeagueForm afterSave={() => setOpen(false)} />
          </Modal.Content>
        </Modal>
        <PrimaryButton label={t("button")} onClick={() => {}} />
      </div>
      <div className={styles.cols}>
        <h3>{t("col1")}</h3>
        <h3>{t("col2")}</h3>
      </div>
      <div className={styles.table}>
        {/* <div>
          {leaguesQuery.isLoading ? (
            <div className={styles.cols}>
              <p>Loading...</p>
            </div>
          ) : leaguesQuery.isError || !leaguesQuery.data ? (
            <div className={styles.cols}>
              <p>Error fetching data</p>
            </div>)}
          {leagues.map((league, index) => (
            <div className={styles.cols} key={index}>
              <p>{league}</p>
              <DropdownMenuButton onDelete={() => {}} onEdit={() => {}} />
            </div>
          ) : (
            leaguesQuery.data?.data.map((league: LeagueType) => (
              <div className={styles.cols} key={league.id}>
                <p>{league.name}</p>
                <DropdownMenuButton />
              </div>
            ))
          )}
        </div> */}
      </div>
    </Page>
  );
};

export default Leagues;
