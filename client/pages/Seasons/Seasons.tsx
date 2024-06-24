import React from "react";
import Page from "../../components/Page/Page";
import SeasonForm from "../../components/Forms/SeasonForm/SeasonForm";
import Modal from "../../components/Modal/Modal";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import styles from "./Seasons.module.css";

const Seasons = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Page>
      <h1 className={styles.h1}>The Premier League </h1>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild className={styles.btn}>
          <PrimaryButton
            label="Add Season"
            onClick={() => setOpen(true)}></PrimaryButton>
        </Modal.Button>
        <Modal.Content title="Create Season">
          <SeasonForm afterSave={() => setOpen(false)} />
        </Modal.Content>
      </Modal>
    </Page>
  );
};

export default Seasons;
