import React from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import styles from "./Home.module.css";
import LeagueForm from "../../components/Forms/LeagueForm/LeagueForm";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Layout>
      <p className="text-2xl font-bold underline">Home</p>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Button asChild className={styles.btn}>
          <button>Create New League</button>
        </Modal.Button>
        <Modal.Content title="Create League">
          <LeagueForm afterSave={() => setOpen(false)} />
        </Modal.Content>
      </Modal>
    </Layout>
  );
};

export default Home;
