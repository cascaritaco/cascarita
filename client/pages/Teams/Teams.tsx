import { useState } from "react";
import styles from "./Teams.module.css";
import Page from "../../components/Page/Page";
import Search from "../../components/Search/Search";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const Teams = () => {
  const [sorts, setSorts] = useState("");
  const [open, setOpen] = useState(false);

  // const groupId = currentUser?.group_id;
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["teams", groupId ? groupId : 0],
  //   queryFn: getTeamByGroupId,
  // });

  return (
    <Page>
      <h1 className={styles.h1}>Team Name</h1>

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

        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Button asChild className={styles.btn}>
            <PrimaryButton
              label="Add Team"
              onClick={() => setOpen(true)}></PrimaryButton>
          </Modal.Button>

          <Modal.Content title="Create Team">
            Hello from Team Form
          </Modal.Content>
        </Modal>
      </div>
    </Page>
  );
};

export default Teams;
