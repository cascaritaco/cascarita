import { useState } from "react";
import styles from "./Teams.module.css";
import Page from "../../components/Page/Page";
import { useTranslation } from "react-i18next";
import Search from "../../components/Search/Search";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import TeamForm from "../../components/Forms/TeamForm/TeamForm";
import { TeamType } from "./types";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getTeamByGroupId } from "../../api/teams/service";

const Teams = () => {
  const { t } = useTranslation("Teams");
  const [sorts, setSorts] = useState("");
  const [open, setOpen] = useState(false);

  const { currentUser } = useAuth();
  const groupId = currentUser?.group_id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams", groupId ? groupId : 0],
    queryFn: getTeamByGroupId,
  });

  return (
    <Page>
      <h1 className={styles.h1}>{t("title")}</h1>

      <div className={styles.filterSearch}>
        <div className={styles.dropdown}>
          <Search />
          <div className={styles.filterContainer}>
            <p className={styles.filterSubTitle}>{t("sort")}</p>
            <SelectMenu
              placeholder="Sort By"
              name="sort"
              value={sorts}
              onValueChange={(value) => setSorts(value)}
              className={styles.selectMenu}>
              <SelectMenu.Item value="alphabetical">
                Alphabetical
              </SelectMenu.Item>
              <SelectMenu.Item value="lastCreated">
                Last Created
              </SelectMenu.Item>
            </SelectMenu>
          </div>
        </div>

        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Button asChild className={styles.btn}>
            <PrimaryButton
              label="Add Team"
              onClick={() => setOpen(true)}></PrimaryButton>
          </Modal.Button>

          <Modal.Content title="Create Team">
            <TeamForm afterSave={() => setOpen(false)} />
          </Modal.Content>
        </Modal>
      </div>

      <DashboardTable headers={["Team Name", "Options"]}>
        {isLoading ? (
          <tr>
            <td>Loading...</td>
          </tr>
        ) : isError || !data ? (
          <tr>
            <td>Error Fetching Data</td>
          </tr>
        ) : (
          data?.map((team: TeamType, idx: number) => (
            <tr key={idx} className={styles.tableRow}>
              <td className={styles.tableData}>{team.name}</td>
              <td>
                <DropdownMenuButton />
              </td>
            </tr>
          ))
        )}
      </DashboardTable>
    </Page>
  );
};

export default Teams;
