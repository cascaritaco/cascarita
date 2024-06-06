import Page from "../../components/Page/Page";
import Search from "../../components/Search/Search";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import styles from "./Forms.module.css";
import ShareButton from "../../components/ShareButton/ShareButton";
import { useNavigate } from "react-router-dom";
import { Form } from "./types";
import { Field } from "../../components/DNDCanvas/types";

const Forms = () => {
  const [sorts, setSorts] = useState("");
  const [forms, setForms] = useState<Form[]>([]);
  const navigate = useNavigate();

  const sortStatuses = ["Alphabetical", "Date"];

  useEffect(() => {
    const surveys = JSON.parse(localStorage.getItem("surveys") ?? "{}");
    setForms(Object.values(surveys ?? []));
  }, []);

  const handleNewFormClick = () => {
    navigate("/forms/check");
  };

  const onDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/survey/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete form");
      }

      // Delete the form from local storage
      const surveys = JSON.parse(localStorage.getItem("surveys") ?? "{}");
      delete surveys[id];
      localStorage.setItem("surveys", JSON.stringify(surveys));
      setForms(Object.values(surveys ?? []));
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = (
    id: string,
    title: string,
    description: string,
    link: string,
    fields: Field[],
  ) => {
    navigate("/forms/check", {
      state: { id, title, description, link, fields },
    });
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
              <p>{form.title}</p>
              <p>{form.edittedBy}</p>
              <p>{form.lastUpdated}</p>
              <DropdownMenuButton
                onDelete={() => onDelete(form.id)}
                onEdit={() =>
                  onEdit(
                    form.id,
                    form.title,
                    form.description,
                    form.link,
                    form.fields,
                  )
                }
              />
              <a href={form.link} target="_blank" rel="noopener noreferrer">
                <ShareButton />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Forms;
