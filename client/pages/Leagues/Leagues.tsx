import styles from "./Leagues.module.css";
import Search from "../../components/Search/Search";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import Page from "../../components/Page/Page";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";
import LeagueForm from "../../components/Forms/LeagueForm";
import { LeagueType } from "../../api/teams/types";
import { useQuery } from "@tanstack/react-query";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../components/AuthContext/types";

interface LeaguesProps {
  currentUser: User;
}

const Leagues: React.FC<LeaguesProps> = ({ currentUser }) => {
  const { t } = useTranslation("Leagues");

  const [filter, setFilter] = useState("");
  const [sorts, setSorts] = useState("");

  const filterStatuses = [t("filterOptions.item1"), t("filterOptions.item2")];
  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];
  const [open, setOpen] = useState(false);

  const leaguesQuery = useQuery({
    queryFn: () =>
      fetch(`/api/groups/${currentUser.group_id}/leagues`).then((res) =>
        res.json(),
      ),
    queryKey: ["leagues"],
  });

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
            <LeagueForm
              afterSave={() => setOpen(false)}
              currentUser={currentUser}
            />
          </Modal.Content>
        </Modal>
      </div>

      {!leaguesQuery.data ? (
        <p className={styles.noLeagueMessage}>Add a League to Display...</p>
      ) : (
        <DashboardTable headers={["Name", "Options"]}>
          {leaguesQuery.isLoading ? (
            <tr>
              <p>Loading...</p>
            </tr>
          ) : leaguesQuery.isError || !leaguesQuery.data ? (
            <tr>
              <p>Error Fetching Data</p>
            </tr>
          ) : (
            leaguesQuery.data?.map((league: LeagueType, idx: number) => (
              <tr key={idx} className={styles.tableRow}>
                <td className={styles.tableData}>{league.name}</td>
                <td>
                  <DropdownMenuButton />
                </td>
              </tr>
            ))
          )}
        </DashboardTable>
      )}
    </Page>
  );
};

export default Leagues;
