import React from "react";
import styles from "./DashboardTable.module.css";

interface TableProps {
  headers: string[];
  children: (string | React.ReactNode)[][];
  className?: string;
}

const DashboardTable: React.FC<TableProps> = ({
  headers,
  children,
  className,
}) => {
  const tableClassName = `${styles.table} ${className}`;
  return (
    <div className={styles.tableContainer}>
      <table className={tableClassName}>
        <thead>
          <tr>
            {headers.map((header, idx) => {
              return (
                <th key={idx} className={styles.header}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className={styles.tableBody}>{children}</tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
