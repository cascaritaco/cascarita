import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Team } from "../../pages/Home/Home";
import styles from "./TeamStandingsTable.module.css";

interface TeamStandingsTableProps {
  data: Team[]; // Ensure that the prop is defined correctly
}

const columnHelper = createColumnHelper<Team>();

const columns = [
  columnHelper.accessor("position", {
    header: () => "",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("team_name", {
    header: () => "Team",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("played", {
    header: () => "Pl",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("won", {
    header: () => "W",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("drawn", {
    header: () => "D",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("lost", {
    header: () => "L",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("gd", {
    header: () => "GD",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("points", {
    header: () => "Pts",
    cell: (info) => info.renderValue(),
  }),
];

export const TeamStandingsTable: React.FC<TeamStandingsTableProps> = ({
  data,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles["table-container"]}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
