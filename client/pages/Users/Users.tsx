// Libraries
import { useTranslation } from "react-i18next";
import * as Avatar from "@radix-ui/react-avatar";
import { useState, useEffect } from "react";

// Data Retrieval
import { getUsersByGroupId } from "../../api/users/service";

// Components
import { useAuth } from "../../components/AuthContext/AuthContext";
import Page from "../../components/Page/Page";
import styles from "./Users.module.css"
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import { User } from "./types";

const Users = () => {
  // Confligure translation
  const { t } = useTranslation("Users");

  // State variables
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const mapRoles = (role_id: number) => {
    switch (role_id) {
      case 1:
        return "Staff";
    }
  }

  // Fetch users by group id of current user
  useEffect(() => {
    (async () => {
      const data =
        await getUsersByGroupId(currentUser?.group_id ?? 0)
          .then((res) => {
            return res.filter((user: User) => user.email !== currentUser?.email);
          });
      setUsers(data);
    })();
  }, []);

  return (
    <Page title={t("title")}>
      <DashboardTable
        headers={["Name", "Email", "Role", "Options"]}
        headerColor="light"
      >

        {users?.map((user, idx) => (
          <tr key={idx} className={styles.tableRow}>
            <td className={`${styles.tableData} ${styles.leadingColumn}`}>
              <Avatar.Root className="AvatarRoot">
                <Avatar.Image
                  className={styles.avatar}
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                  alt={user.first_name + " " + user.last_name}
                />
                <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                  {user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase}
                </Avatar.Fallback>
              </Avatar.Root>
              <div className={styles.email}>
                {user.first_name} {user.last_name}
              </div>
            </td>
            <td className={styles.tableData}>{user.email}</td>
            <td className={styles.tableData}>{mapRoles(user.role_id)}</td>
            <td className={styles.tableData}>
              <DropdownMenuButton>
                <DropdownMenuButton.Item
                  onClick={() => NaN}>
                  Edit
                </DropdownMenuButton.Item>

                <DropdownMenuButton.Separator
                  className={styles.separator}
                />

                <DropdownMenuButton.Item
                  onClick={() => NaN}>
                  Delete
                </DropdownMenuButton.Item>
              </DropdownMenuButton>
            </td>
          </tr>))
        }

      </DashboardTable>
    </Page >
  );
};

export default Users;