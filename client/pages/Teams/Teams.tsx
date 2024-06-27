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

const Teams = () => {
  const { t } = useTranslation("Teams");
  const [sorts, setSorts] = useState("");
  const [open, setOpen] = useState(false);

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

      <DashboardTable headers={["Team Name", "Division", "Options"]}>
        <tr className={styles.tableRow}>
          <td className={styles.tableData}>Team Name</td>
          <td className={styles.tableData}>Team Division</td>
          <td className={styles.tableData}>
            <DropdownMenuButton />
          </td>
        </tr>

        <tr className={styles.tableRow}>
          <td className={styles.tableData}>Team Name</td>
          <td className={styles.tableData}>Team Division</td>
          <td className={styles.tableData}>
            <DropdownMenuButton />
          </td>
        </tr>
      </DashboardTable>
    </Page>
  );
};

export default Teams;
