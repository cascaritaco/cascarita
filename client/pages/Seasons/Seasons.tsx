import Search from "../../components/Search/Search";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import Page from "../../components/Page/Page";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";
import SeasonForm from "../../components/Forms/SeasonForm/SeasonForm";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSeasonsByLeagueId } from "../../api/seasons/services";
import { SeasonType } from "./types";
import styles from "../Leagues/Leagues.module.css";

const Seasons = () => {
  const { leagueId, leagueName } = useParams<{
    leagueId: string;
    leagueName: string;
  }>();
  const leagueIdNumber = leagueId ? parseInt(leagueId, 10) : 0;

  const { t } = useTranslation("Seasons");

  const [filter, setFilter] = useState("");
  const [sorts, setSorts] = useState("");
  const [currentSeasonName, setCurrentSeasonName] = useState("");
  const [currentSeasonId, setCurrentSeasonId] = useState(0);

  const filterStatuses = [t("filterOptions.item1"), t("filterOptions.item2")];
  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["seasons", leagueIdNumber],
    queryFn: getSeasonsByLeagueId,
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEdit = (seasonName: string, seasonId: number) => {
    setCurrentSeasonName(seasonName);
    setCurrentSeasonId(seasonId);
    setIsEditOpen(true);
  };

  const handleDelete = (seasonName: string, seasonId: number) => {
    setCurrentSeasonName(seasonName);
    setCurrentSeasonId(seasonId);
    setIsDeleteOpen(true);
  };

  return (
    <Page>
      <h1 className={styles.h1}> {leagueName} </h1>

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
              onClick={() => setIsCreateOpen(true)}></PrimaryButton>
          </Modal.Button>
          <Modal.Content title={t("formContent.title")}>
            <SeasonForm
              afterSave={() => setIsCreateOpen(false)}
              requestType="POST"
              leagueId={leagueIdNumber}
            />
          </Modal.Content>
        </Modal>
      </div>

      {data == null || data?.length === 0 ? (
        <p className={styles.noLeagueMessage}>Add a Season to Display...</p>
      ) : (
        <DashboardTable headers={[t("col1"), t("col2"), t("col3"), t("col4")]}>
          {isLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : isError || !data ? (
            <tr>
              <td>Error Fetching Data</td>
            </tr>
          ) : (
            data?.map((season: SeasonType, idx: number) => (
              <tr key={idx} className={styles.tableRow}>
                <td className={styles.tableData}>
                  <Link to={`/division/${season.id}/${season.name}`}>
                    {season.name}
                  </Link>
                </td>
                <td className={styles.tableData}>
                  {formatDate(season.start_date)}
                </td>
                <td className={styles.tableData}>
                  {formatDate(season.end_date)}
                </td>
                <td>
                  <DropdownMenuButton>
                    <DropdownMenuButton.Item
                      onClick={() => handleEdit(season.name, season.id)}>
                      {t("edit")}
                    </DropdownMenuButton.Item>

                    <DropdownMenuButton.Separator
                      className={styles.separator}
                    />

                    <DropdownMenuButton.Item
                      onClick={() => handleDelete(season.name, season.id)}>
                      {t("delete")}
                    </DropdownMenuButton.Item>
                  </DropdownMenuButton>
                </td>
              </tr>
            ))
          )}
        </DashboardTable>
      )}

      <Modal open={isEditOpen} onOpenChange={setIsEditOpen}>
        <Modal.Content title={`Edit ${currentSeasonName}`}>
          <SeasonForm
            afterSave={() => setIsEditOpen(false)}
            requestType="PATCH"
            seasonId={currentSeasonId}
          />
        </Modal.Content>
      </Modal>

      <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Modal.Content title={`Delete ${currentSeasonName}`}>
          <SeasonForm
            afterSave={() => setIsDeleteOpen(false)}
            requestType="DELETE"
            seasonId={currentSeasonId}
          />
        </Modal.Content>
      </Modal>
    </Page>
  );
};

export default Seasons;
