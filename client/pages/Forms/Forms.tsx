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
import { deleteForm, fetchFormData, getForms } from "../../api/forms/service";

const Forms = () => {
  const { t } = useTranslation("Forms");
  const [sorts, setSorts] = useState("");
  const [forms, setForms] = useState<Form[]>([]);
  const navigate = useNavigate();

  const sortStatuses = [t("sortOptions.item1"), t("sortOptions.item2")];

  useEffect(() => {
    (async () => {
      const fetchedForms = await getForms();
      setForms(fetchedForms.items ?? []);
    })();
  }, []);

  const handleNewFormClick = () => {
    navigate("/forms/check");
  };

  const onDelete = async (id: string) => {
    await deleteForm(id);
    setForms((forms) => forms.filter((form) => form.id !== id));
  };

  const onEdit = async (id: string) => {
    const form = await fetchFormData(id, "");
    navigate("/forms/check", {
      state: {
        id,
        title: form.title,
        description: form.welcome_screens?.[0]?.properties?.description ?? "",
        link: form._links.display,
        fields: form.fields,
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
              <p>{form.title}</p>
              <p>{form.editedBy}</p>
              <p>{new Date(form.last_updated_at).toLocaleString()}</p>
              <DropdownMenuButton
                onDelete={() => onDelete(form.id)}
                onEdit={() => onEdit(form.id)}
              />
              <a
                href={form._links.display}
                target="_blank"
                rel="noopener noreferrer">
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
