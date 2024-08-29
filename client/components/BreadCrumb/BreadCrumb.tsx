import { Params, useMatches } from "react-router-dom";
import styles from "./BreadCrumb.module.css";
import React from "react";

interface IMatches {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: unknown;
}

type HandleType = {
  crumb: (param?: string) => React.ReactNode;
};

function Breadcrumbs() {
  const matches: IMatches[] = useMatches();

  const crumbs = matches
    .filter((match) =>
      Boolean(match.handle && (match.handle as HandleType).crumb),
    )
    .map((match) => {
      const crumb = (match.handle as HandleType).crumb(
        match.data as string | undefined,
      );
      return crumb as React.ReactNode;
    });

  return (
    <ol className={styles.breadcrumb}>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  );
}

export default Breadcrumbs;
