import { useLocation, Link, useParams } from "react-router-dom";
import styles from "./BreadCrumb.module.css";
import { useEffect, useState } from "react";

const BreadCrumb = () => {
  const location = useLocation();
  const { leagueName, seasonName, divisionName, teamName } = useParams();
  const [breadCrumbItems, setBreadCrumbItems] = useState<
    Array<{
      name: string | undefined;
      to: string;
    }>
  >([]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const items: Array<{ name: string | undefined; to: string }> = [];

    if (pathnames.includes("season")) {
      items.push({ name: leagueName, to: `/home` });
    }
    if (pathnames.includes("division")) {
      items.push({ name: seasonName, to: `/season/${seasonName}` });
    }
    if (pathnames.includes("teams")) {
      items.push({
        name: divisionName,
        to: `/division/${divisionName}`,
      });
    }
    if (teamName) {
      items.push({ name: teamName, to: location.pathname });
    }

    setBreadCrumbItems(items);
  }, [location, leagueName, seasonName, divisionName, teamName]);

  return (
    <nav>
      <ol className={styles.breadcrumb}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {breadCrumbItems.map((item, index: number) => (
          <li key={index}>
            <Link to={item.to ?? "#"}>
              {decodeURIComponent(item.name ?? "")}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
