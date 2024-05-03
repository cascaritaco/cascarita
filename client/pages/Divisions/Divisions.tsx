import React, { useState } from "react";
import styles from "./Divisions.module.css";
import Search from "../../components/Search/Search";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import Page from "../../components/Page/Page";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import Modal from "../../components/Modal/Modal"; // Import the Modal component
import DivisionForm from "../../components/Forms/DivisionForm"; // Import DivisionForm component

const Divisions = () => {
  const [filter, setFilter] = useState("");
  const [sorts, setSorts] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const divisions = [
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
  ];

  const filterStatuses = ["Active", "Inactive"];
  const sortStatuses = ["Alphabetical", "Date"];

  return (
    <Page>
      <h1 className={styles.h1}>Divisions</h1>
      <div className={styles.filterSearch}>
        <div className={styles.dropdown}>
          <Search />
          <div className={styles.filterContainer}>
            <p className={styles.filterSubTitle}>Filter</p>
            <SelectMenu
              placeholder="Active"
              name="filter"
              value={filter}
              onValueChange={(value) => setFilter(value)}
            >
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
            <p className={styles.filterSubTitle}>Sort By</p>
            <SelectMenu
              placeholder="Alphabetical"
              name="sorts"
              value={sorts}
              onValueChange={(value) => setSorts(value)}
            >
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
        <PrimaryButton label="Add Division" onClick={handleModalOpen} />
      </div>
      <div className={styles.cols}>
        <h3>Divisions</h3>
        <h3>Start</h3>
        <h3>End</h3>
        <h3>Options</h3>
      </div>
      <div className={styles.table}>
        <div>
          {divisions.map((division, index) => (
            <div className={styles.cols} key={index}>
              <p>{division}</p>
              <p>01/01/2021</p>
              <p>01/01/2022</p>
              <DropdownMenuButton />
            </div>
          ))}
        </div>
      </div>
      <Modal open={isModalOpen} onOpenChange={handleModalClose}>
        <Modal.Content title="Create Division">
          {/* Render the DivisionForm component */}
          <DivisionForm afterSave={handleModalClose} />
        </Modal.Content>
      </Modal>
    </Page>
  );
};

export default Divisions;
