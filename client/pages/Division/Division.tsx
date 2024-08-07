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
import { getDivisionsBySeasonId } from "../../components/Forms/DivisionForm/services/service";
import DivisionForm from "../../components/Forms/DivisionForm/DivisionForm";

const Divisions = () => {
  const { seasonId } = useParams<{ seasonId: string }>();
  const { seasonName } = useParams<{ seasonName: string }>();
  const seasonIdNumber = seasonId ? parseInt(seasonId, 10) : 0;

  const { t } = useTranslation("Leagues");

  const [filter, setFilter] = useState("");
  const [sorts, setSorts] = useState("");
  const [currentDivisionName, setCurrentDivisionName] = useState("");
  const [currentDivisionId, setCurrentDivisionId] = useState(0);

  const filterStatuses = [t("filterOptions.item1"), t("filterOptions.item2")];
  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["divisions", seasonIdNumber],
    queryFn: getDivisionsBySeasonId,
  });

  const handleEdit = (divisionName: string, divisionId: number) => {
    setCurrentDivisionName(divisionName);
    setCurrentDivisionId(divisionId);
    setIsEditOpen(true);
  };

  const handleDelete = (divisionName: string, divisionId: number) => {
    setCurrentDivisionName(divisionName);
    setCurrentDivisionId(divisionId);
    setIsDeleteOpen(true);
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

        <Modal open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <Modal.Button asChild className={styles.btn}>
            <PrimaryButton
              label="Add Divison"
              onClick={() => setIsCreateOpen(true)}></PrimaryButton>
          </Modal.Button>
          <Modal.Content title="Create Division">
            <DivisionForm
              afterSave={() => setIsCreateOpen(false)}
              requestType="POST"
              seasonId={seasonIdNumber}
            />
          </Modal.Content>
        </Modal>
      </div>

      {data == null || data?.length === 0 ? (
        <p className={styles.noLeagueMessage}>Add a Division to Display...</p>
      ) : (
        <DashboardTable headers={["Division Name", "Options"]}>
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
                  <Link
                    to={`/teams/seasons/${seasonIdNumber}/division/${division.id}/${division.name}`}>
                    {division.name}
                  </Link>
                </td>
                <td>
                  <DropdownMenuButton>
                    <DropdownMenuButton.Item
                      onClick={() => handleEdit(division.name, division.id)}>
                      Edit
                    </DropdownMenuButton.Item>

                    <DropdownMenuButton.Separator
                      className={styles.separator}
                    />

                    <DropdownMenuButton.Item
                      onClick={() => handleDelete(division.name, division.id)}>
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
        <Modal.Content title={`Edit ${currentDivisionName}`}>
          <DivisionForm
            afterSave={() => setIsEditOpen(false)}
            requestType="PATCH"
            divisionId={currentDivisionId}
          />
        </Modal.Content>
      </Modal>

      <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Modal.Content title={`Edit ${currentDivisionName}`}>
          <DivisionForm
            afterSave={() => setIsDeleteOpen(false)}
            requestType="DELETE"
            divisionId={currentDivisionId}
          />
        </Modal.Content>
      </Modal>
    </Page>
  );
};

export default Divisions;
