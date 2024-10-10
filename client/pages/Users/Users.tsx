import Page from "../../components/Page/Page";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import { useTranslation } from "react-i18next";


const Users = () => {
  const { t } = useTranslation("Users");

  return (
    <Page title={t("title")}>
      <div>
      </div>
    </Page>
  );
};

export default Users;