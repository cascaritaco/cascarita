import { useState } from "react";
import styles from "./Teams.module.css";
import Page from "../../components/Page/Page";
import Search from "../../components/Search/Search";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { getTeamsBySeasonDivisionId } from "../../api/teams/service";
import { useParams } from "react-router-dom";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import { useQuery } from "@tanstack/react-query";
import { TeamType } from "./types";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import TeamForm from "../../components/Forms/TeamsForm/TeamForm";

const Teams = () => {
  const { seasonId, divisionId, divisionName } = useParams<{
    seasonId: string;
    divisionId: string;
    divisionName: string;
  }>();
  const seasonIdNumber = seasonId ? parseInt(seasonId, 10) : 0;
  const divisionIdNumber = divisionId ? parseInt(divisionId, 10) : 0;
  const [sorts, setSorts] = useState("");
  const [currentTeamName, setCurrentTeamName] = useState("");
  const [currentTeamId, setCurrentTeamId] = useState(0);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams", seasonIdNumber, divisionIdNumber],
    queryFn: getTeamsBySeasonDivisionId,
  });

  const handleEdit = (teamName: string, teamId: number) => {
    setCurrentTeamName(teamName);
    setCurrentTeamId(teamId);
    setIsEditOpen(true);
  };

  const handleDelete = (teamName: string, teamId: number) => {
    setCurrentTeamName(teamName);
    setCurrentTeamId(teamId);
    setIsDeleteOpen(true);
  };

  return (
    <Page>
      <h1 className={styles.h1}>{divisionName}</h1>

      <div className={styles.filterSearch}>
        <div className={styles.dropdown}>
          <Search />
          <div className={styles.filterContainer}>
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

        <Modal open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <Modal.Button asChild className={styles.btn}>
            <PrimaryButton
              label="Add Team"
              onClick={() => setIsCreateOpen(true)}></PrimaryButton>
          </Modal.Button>

          <Modal.Content title="Create Team">
            <TeamForm
              afterSave={() => setIsCreateOpen(false)}
              seasonId={seasonIdNumber}
              divisionId={divisionIdNumber}
              requestType="POST"
            />
          </Modal.Content>
        </Modal>
      </div>

      {data == null || data?.length === 0 ? (
        <p className={styles.noLeagueMessage}>Add a Team to Display...</p>
      ) : (
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
                <td className={styles.tableData}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                    <img src={team.team_logo} />
                    {team.name}
                  </div>
                </td>
                <td>
                  <DropdownMenuButton>
                    <DropdownMenuButton.Item
                      onClick={() => handleEdit(team.name, team.id)}>
                      Edit
                    </DropdownMenuButton.Item>

                    <DropdownMenuButton.Separator
                      className={styles.separator}
                    />

                    <DropdownMenuButton.Item
                      onClick={() => handleDelete(team.name, team.id)}>
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
        <Modal.Content title={`Edit ${currentTeamName}`}>
          <TeamForm
            afterSave={() => setIsEditOpen(false)}
            requestType="PATCH"
            divisionId={divisionIdNumber}
            seasonId={seasonIdNumber}
            teamId={currentTeamId}
          />
        </Modal.Content>
      </Modal>

      <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Modal.Content title={`Delete ${currentTeamName}`}>
          <TeamForm
            afterSave={() => setIsDeleteOpen(false)}
            requestType="DELETE"
            divisionId={divisionIdNumber}
            seasonId={seasonIdNumber}
            teamId={currentTeamId}
          />
        </Modal.Content>
      </Modal>
    </Page>
  );
};

export default Teams;
