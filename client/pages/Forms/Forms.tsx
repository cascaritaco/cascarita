import Page from "../../components/Page/Page";
import Search from "../../components/Search/Search";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import styles from "./Forms.module.css";
import ShareButton from "../../components/ShareButton/ShareButton";
import { useNavigate } from "react-router-dom";

const Forms = () => {
  const [sorts, setSorts] = useState("");
  const navigate = useNavigate();

  const sortStatuses = ["Alphabetical", "Date"];

  const forms = ["form1", "form2", "form3"];
  const editsBy = ["editBy1", "editBy2", "editBy3"];
  const dates = ["date1", "date2", "date3"];

  const handleNewFormClick = () => {
    navigate("/forms/check");
  };

  return (
    <Page>
      <h1 className={styles.h1}>Forms</h1>
      <div className={styles.filterSearch}>
        <div className={styles.dropdown}>
          <Search />
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
        <PrimaryButton label="Add Form" onClick={handleNewFormClick} />
      </div>
      <div className={styles.cols}>
        <h3>Title</h3>
        <h3>Edited By</h3>
        <h3>Last Updated</h3>
        <h3>Options</h3>
        <h3>Share</h3>
      </div>
      <div className={styles.table}>
        <div>
          {forms.map((form, index) => (
            <div className={styles.cols} key={index}>
              <p>{form}</p>
              <p>{editsBy[index]}</p>
              <p>{dates[index]}</p>
              <DropdownMenuButton />
              <ShareButton />
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Forms;
