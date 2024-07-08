import { useState } from "react";
import styles from "./Division.module.css";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DivisionType } from "./types";
import Page from "../../components/Page/Page";
import Search from "../../components/Search/Search";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useQuery } from "@tanstack/react-query";

const Divisions = () => {
  const { seasonId } = useParams<{ seasonId: string }>();
  const { seasonName } = useParams<{ seasonName: string }>();
  // const seasonIdNumber = seasonId ? parseInt(seasonId, 10) : 0;
  console.log("Season Name from useParams:", seasonName);
  console.log("Season Id from useParams:", seasonId);

  const { t } = useTranslation("Leagues");

  const [filter, setFilter] = useState("");
  const [sorts, setSorts] = useState("");

  const filterStatuses = [t("filterOptions.item1"), t("filterOptions.item2")];
  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["season", seasonId],
    // queryFn: getDivisionsBySeasonId,
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
      <h1 className={styles.h1}>{seasonName}</h1>

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
              label="Add Divison"
              onClick={() => setOpen(true)}></PrimaryButton>
          </Modal.Button>
          <Modal.Content title="Create Division">
            Create Season Here
          </Modal.Content>
        </Modal>
      </div>

      {data == null || data?.length === 0 ? (
        <p className={styles.noLeagueMessage}>Add a Season to Display...</p>
      ) : (
        <DashboardTable headers={["Name", "Start", "End", "Options"]}>
          {isLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : isError || !data ? (
            <tr>
              <td>Error Fetching Data</td>
            </tr>
          ) : (
            data?.map((division: DivisionType, idx: number) => (
              <tr key={idx} className={styles.tableRow}>
                <td className={styles.tableData}>
                  <Link to={`/seasons/:seasonId/:seasonName`}>
                    {division.name}
                  </Link>
                </td>
                <td className={styles.tableData}>
                  {formatDate(division.start_date)}
                </td>
                <td className={styles.tableData}>
                  {formatDate(division.end_date)}
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

export default Divisions;
