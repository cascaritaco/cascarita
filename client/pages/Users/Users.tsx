// Libraries
import { useTranslation } from "react-i18next";
import * as Avatar from "@radix-ui/react-avatar";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Data Retrieval
import { getUsersByGroupId } from "../../api/users/service";

// Components
import { useAuth } from "../../components/AuthContext/AuthContext";
import Page from "../../components/Page/Page";
import styles from "./Users.module.css"
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import { User } from "./types";
import Search from "../../components/Search/Search";
import { TbSettingsSearch } from "react-icons/tb";


const Users = () => {
  // Confligure translation
  const { t } = useTranslation("Users");

  // State variables
  const { currentUser } = useAuth();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const mapRoles = (role_id: number) => {
    switch (role_id) {
      case 1:
        return "Staff";
    }
  }

  const groupId = currentUser?.group_id;

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users", groupId ? groupId : 0],
    queryFn: getUsersByGroupId,
  });

  // useEffect(() => {
  //   const filteredData = data?.filter((user: User) => user.email !== currentUser?.email);
  //   setUsers(filteredData);
  // }, [data]);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (users) {
      const filteredData = users.filter((user: User) => {
        const fullName = `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`;
        const query = debouncedQuery.toLowerCase();
        return (
          fullName.includes(query) ||
          user.email.toLowerCase().includes(query)
        ) && user.email !== currentUser?.email; // Exclude current user
      });
      setFilteredUsers(filteredData);
    }
  }, [debouncedQuery, users]);

  return (
    <Page title={t("title")}>
      <div className={styles.filterSearch}>
        <div className={styles.dropdown}>
          <Search onSearchChange={setSearchQuery} />
        </div>
      </div>
      <DashboardTable
        headers={["Name", "Email", "Role", "Options"]}
        headerColor="light"
      >

        {filteredUsers?.map((user: User, idx: number) => (
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