import styles from "./Leagues.module.css";
import Search from "../../components/Search/Search";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DropdownMenuButton from "../../components/DropdownMenuButton/DropdownMenuButton";
import Page from "../../components/Page/Page";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import React from "react";
import Modal from "../../components/Modal/Modal";
import LeagueForm from "../../components/Forms/LeagueForm";
import { LeagueType } from "../../api/teams/types";
import { useQuery } from "@tanstack/react-query";
import DashboardTable from "../../components/DashboardTable/DashboardTable";

const Leagues = () => {
  const [filter, setFilter] = React.useState("");
  const [sorts, setSorts] = React.useState("");

  const filterStatuses = ["Active", "Inactive"];
  const sortStatuses = ["Alphabetical", "Date"];

  const [open, setOpen] = React.useState(false);
  const leaguesQuery = useQuery({
    queryFn: () => fetch("/api/league/1").then((res) => res.json()),
    queryKey: ["leagues"],
  });

  return (
    <Page>
      <h1 className={styles.h1}>Leagues</h1>
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

        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Button asChild className={styles.btn}>
            <PrimaryButton
              label="Add League"
              onClick={() => setOpen(true)}
            ></PrimaryButton>
          </Modal.Button>
          <Modal.Content title="Create League">
            <LeagueForm afterSave={() => setOpen(false)} />
          </Modal.Content>
        </Modal>
      </div>

      <DashboardTable headers={["Name", "Options"]}>
        {leaguesQuery.data?.data.map((league: LeagueType, idx: number) => (
          <tr
            key={idx}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <td style={{ padding: "12px 0" }}>{league.name}</td>
            <td>
              <DropdownMenuButton />
            </td>
          </tr>
        ))}
      </DashboardTable>

      {/* <div className={styles.cols}> */}
      {/*   <h3>Name</h3> */}
      {/*   <h3>Options</h3> */}
      {/* </div> */}
      {/**/}
      {/* <div className={styles.table}> */}
      {/*   <div> */}
      {/*     {leaguesQuery.isLoading ? ( */}
      {/*       <div className={styles.cols}> */}
      {/*         <p>Loading...</p> */}
      {/*       </div> */}
      {/*     ) : leaguesQuery.isError || !leaguesQuery.data ? ( */}
      {/*       <div className={styles.cols}> */}
      {/*         <p>Error fetching data</p> */}
      {/*       </div> */}
      {/*     ) : ( */}
      {/*       leaguesQuery.data?.data.map((league: LeagueType) => ( */}
      {/*         <div className={styles.cols} key={league.id}> */}
      {/*           <p>{league.name}</p> */}
      {/*           <DropdownMenuButton /> */}
      {/*         </div> */}
      {/*       )) */}
      {/*     )} */}
      {/*   </div> */}
      {/* </div> */}
    </Page>
  );
};

export default Leagues;
