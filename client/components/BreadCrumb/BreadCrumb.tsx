// import { Link, useParams, matchPath, useLocation } from "react-router-dom";
//
// const routes = [
//   { path: "/", breadcrumb: "Home" },
//   { path: "/league/:leagueId/:leagueName", breadcrumb: (params: string) => decodeURIComponent(params.leagueName) },
//   { path: "/", breadcrumb: "Home" },
// ];
//
// const BreadCrumb = () => {
//   const location = useLocation();
//   const pathNames = location.pathname.split("/").filter((x) => x);
//
//   const breadcrumbs = pathNames.map((_, idx) => {
//     const url = `/${pathNames.slice(0, idx + 1).join("/")}`;
//
//     return route ? (
//       <li key={url}>
//         <Link to={url}>{route.breadcrumb}</Link>
//       </li>
//     ) : null;
//   });
//
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         {breadcrumbs}
//       </ul>
//     </nav>
//   );
// };
//
// export default BreadCrumb;
