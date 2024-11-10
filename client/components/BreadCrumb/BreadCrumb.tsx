import { Params, useMatches } from "react-router-dom";
import styles from "./BreadCrumb.module.css";
import React, { useMemo } from "react";

interface IMatches {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: unknown;
}

type HandleType = {
  crumb: React.ReactNode;
};

function Breadcrumbs() {
  const matches: IMatches[] = useMatches();

  const crumbs = useMemo(() => {
    return matches
      .filter((match) =>
        Boolean(match.handle && (match.handle as HandleType).crumb),
      )
      .map((match) => (match.handle as HandleType).crumb);
  }, [matches]);

  return (
    <nav>
      <ol className={styles.breadcrumb}>
        {crumbs.map((crumb, index) => (
          <li key={index}>{crumb}</li>
        ))}
      </ol>
    </nav>
  );
}

export default React.memo(Breadcrumbs);
