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
import { getSeasonsByLeagueId } from "../../components/Forms/SeasonForm/services";
import { SeasonType } from "./types";
import styles from "../Leagues/Leagues.module.css";

const Seasons = () => {
  const { leagueId, leagueName } = useParams<{
    leagueId: string;
    leagueName: string;
  }>();
  const leagueIdNumber = leagueId ? parseInt(leagueId, 10) : 0;

  const { t } = useTranslation("Leagues");

  const [filter, setFilter] = useState("");
  const [sorts, setSorts] = useState("");

  const filterStatuses = [t("filterOptions.item1"), t("filterOptions.item2")];
  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];
  const [open, setOpen] = useState(false);

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

  return (
    <Page>
      <div className={styles.breadcrumb}>
        <Link to={`/home`}>Home</Link>
        <h3> / </h3>
        <Link to={window.location.pathname}>{leagueName}</Link>
      </div>

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

        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Button asChild className={styles.btn}>
            <PrimaryButton
              label="Add Season"
              onClick={() => setOpen(true)}></PrimaryButton>
          </Modal.Button>
          <Modal.Content title="Create Season">
            <SeasonForm
              afterSave={() => setOpen(false)}
              leagueId={leagueIdNumber}
            />
          </Modal.Content>
        </Modal>
      </div>

      {data == null || data?.length === 0 ? (
        <p className={styles.noLeagueMessage}>Add a Season to Display...</p>
      ) : (
        <DashboardTable headers={["Season Name", "Start", "End", "Options"]}>
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
                  <Link to={`/seasons/${season.id}/${season.name}`}>
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

export default Seasons;
