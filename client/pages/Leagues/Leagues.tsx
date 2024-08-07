import styles from "./Leagues.module.css";
import Search from "../../components/Search/Search";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import Page from "../../components/Page/Page";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";
import LeagueForm from "../../components/Forms/LeagueForm/LeagueForm";
import { LeagueType } from "./types";
import { useQuery } from "@tanstack/react-query";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getLeagueByGroupId } from "../../api/leagues/service";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { Link } from "react-router-dom";

const Leagues = () => {
  const { t } = useTranslation("Leagues");

  const [filter, setFilter] = useState("");
  const [sorts, setSorts] = useState("");
  const [currentLeagueName, setCurrentLeagueName] = useState("");
  const [currentLeagueId, setCurrentLeagueId] = useState(0);

  const filterStatuses = [t("filterOptions.item1"), t("filterOptions.item2")];
  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { currentUser } = useAuth();

  const groupId = currentUser?.group_id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["leagues", groupId ? groupId : 0],
    queryFn: getLeagueByGroupId,
  });

  const handleEdit = (leagueName: string, leagueId: number) => {
    setCurrentLeagueName(leagueName);
    setCurrentLeagueId(leagueId);
    setIsEditOpen(true);
  };

  const handleDelete = (leagueName: string, leagueId: number) => {
    setCurrentLeagueName(leagueName);
    setCurrentLeagueId(leagueId);
    setIsDeleteOpen(true);
  };

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

        <Modal open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <Modal.Button asChild className={styles.btn}>
            <PrimaryButton
              label={t("button")}
              onClick={() => setIsCreateOpen(true)}
            />
          </Modal.Button>
          <Modal.Content title="Create League">
            <LeagueForm
              afterSave={() => setIsCreateOpen(false)}
              requestType="POST"
            />
          </Modal.Content>
        </Modal>
      </div>

      {data == null || data?.length === 0 ? (
        <p className={styles.noLeagueMessage}>Add a League to Display...</p>
      ) : (
        <DashboardTable headers={["League Name", "Options"]}>
          {isLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : isError || !data ? (
            <tr>
              <td>Error Fetching Data</td>
            </tr>
          ) : (
            data?.map((league: LeagueType, idx: number) => (
              <tr key={idx} className={styles.tableRow}>
                <td className={styles.tableData}>
                  <Link to={`/season/${league.id}/${league.name}`}>
                    {league.name}
                  </Link>
                </td>
                <td>
                  <DropdownMenuButton>
                    <DropdownMenuButton.Item
                      onClick={() => handleEdit(league.name, league.id)}>
                      Edit
                    </DropdownMenuButton.Item>

                    <DropdownMenuButton.Separator
                      className={styles.separator}
                    />

                    <DropdownMenuButton.Item
                      onClick={() => handleDelete(league.name, league.id)}>
                      Delete
                    </DropdownMenuButton.Item>
                  </DropdownMenuButton>
                </td>
              </tr>
            ))
          )}
        </DashboardTable>
      )}

      <Modal open={isEditOpen} onOpenChange={setIsEditOpen}>
        <Modal.Content title={`Edit ${currentLeagueName}`}>
          <LeagueForm
            afterSave={() => setIsEditOpen(false)}
            requestType="PATCH"
            leagueId={currentLeagueId}
          />
        </Modal.Content>
      </Modal>

      <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Modal.Content title={`Delete ${currentLeagueName}`}>
          <LeagueForm
            afterSave={() => setIsDeleteOpen(false)}
            requestType="DELETE"
            leagueId={currentLeagueId}
          />
        </Modal.Content>
      </Modal>
    </Page>
  );
};

export default Leagues;
