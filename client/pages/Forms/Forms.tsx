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
import { useTranslation } from "react-i18next";
import {
  deleteTypeformForm,
  getMongoFormById,
  getMongoForms,
} from "../../api/forms/service";
import { useAuth } from "../../components/AuthContext/AuthContext";
import Modal from "../../components/Modal/Modal";
import React from "react";
import ShareForm from "../../components/Forms/ShareForm/ShareForm";

interface ShareModalProps {
  formLink: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal: React.FC<ShareModalProps> = ({ formLink, open, setOpen }) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild className={styles.btn}>
        <button onClick={() => setOpen(true)}>
          <ShareButton />
        </button>
      </Modal.Button>
      <Modal.Content title="Share Form">
        <ShareForm afterClose={() => setOpen(false)} formLink={formLink} />
      </Modal.Content>
    </Modal>
  );
};

const Forms = () => {
  const { t } = useTranslation("Forms");
  const [sorts, setSorts] = useState("");
  const [forms, setForms] = useState<Form[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];

  useEffect(() => {
    (async () => {
      const mongoForms = await getMongoForms(currentUser?.group_id ?? -1);
      setForms(mongoForms);
    })();
  }, []);

  const handleNewFormClick = () => {
    navigate("/forms/check");
  };

  const onDelete = async (id: string) => {
    await deleteTypeformForm(id);
    setForms((forms) => forms.filter((form) => form.form_data.id !== id));
  };

  const onEdit = async (id: string) => {
    const form = await getMongoFormById(id);

    navigate("/forms/check", {
      state: {
        id,
        title: form.form_data.title,
        description:
          form.form_data.welcome_screens?.[0]?.properties?.description ?? "",
        link: form.form_data._links.display,
        fields: form.form_data.fields,
      },
    });
  };

  return (
    <Page>
      <h1 className={styles.h1}>{t("title")}</h1>
      <div className={styles.filterSearch}>
        <div className={styles.dropdown}>
          <Search />
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
        <PrimaryButton label={t("button")} onClick={handleNewFormClick} />
      </div>
      <div className={styles.cols}>
        <h3>{t("col1")}</h3>
        <h3>{t("col2")}</h3>
        <h3>{t("col3")}</h3>
        <h3>{t("col4")}</h3>
        <h3>{t("col5")}</h3>
      </div>
      <div className={styles.table}>
        <div>
          {forms.map((form, index) => (
            <div className={styles.cols} key={index}>
              <p>{form.form_data.title}</p>
              <p>{form.created_by?.first_name ?? ""}</p>
              <p>{new Date(form.updatedAt).toLocaleString()}</p>
              <DropdownMenuButton
                onDelete={() => onDelete(form.form_data.id)} // TODO: delete by mongo form ID, this is deleting form by typeform ID
                onEdit={() => onEdit(form._id)}
              />
              {/* <a
                href={form.form_data._links.display}
                target="_blank"
                rel="noopener noreferrer">
                <ShareButton />
              </a> */}
              <ShareModal
                formLink={form.form_data._links.display}
                open={open}
                setOpen={setOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Forms;
