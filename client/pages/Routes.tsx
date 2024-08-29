import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
} from "react-router-dom";

import RootLayout from "../components/Layout/RootLayout";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Layout from "../components/Layout/Layout";
import { Route } from "react-router-dom";
import Seasons from "./Seasons/Seasons";
import Users from "./Users/Users";
import Divisions from "./Division/Division";

export const useRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={<Home />}
          handle={{ crumb: () => <Link to="/">Home</Link> }}>
          <Route
            path="season/:leagueId/:leagueName"
            element={<Seasons />}
            handle={{
              crumb: (leagueId: string, leagueName: string) => (
                <Link to={`season/${leagueId}/${leagueName}`}>Seasons</Link>
              ),
            }}>
            <Route
              path="division/:seasonId/:seasonName"
              element={<Divisions />}
              id="division"
              handle={{
                crumb: () => (
                  <Link to="division/:seasonId/:seasonName">Divisions</Link>
                ),
              }}
            />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />

        {/*}
  <Route
    path="teams/seasons/:seasonId/division/:divisionId/:divisionName"
    element={<Teams />}
    id="team"
    handle={{
      crumb: () => (
        <Link to="teams/seasons/:seasonId/division/:divisionId/:divisionName">
          Teams
        </Link>
      ),
    }}
  /> */}
        <Route
          path="users"
          element={<Users />}
          handle={{ crumb: () => <Link to={"/users"}>Users</Link> }}
        />
        {/* <Route path="schedule" element={<Schedule />} />
        <Route path="forms" element={<Forms />} />
        <Route path="forms/check" element={<NewForm />} />
        <Route path="settings" element={<Settings />} />
        <Route path="forms/:formId" element={<FormPage />} /> */}
      </Route>,
    ),
  );

//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         element: <Layout />,
//         children: [
//           {
//             path: "/",
//             element: <Home />,
//             handle: { crumb: <Link to={"/"}>Dashboard</Link> },
//           },
//           {
//             path: "login",
//             element: <Login />,
//           },
//         ],
//         // children: [
//         //   {
//         //     path: "season/:leagueId/:leagueName",
//         //     element: <Seasons />,
//         //     handle: { crumb: "Seasons" },
//         //     children: [
//         //       {
//         //         path: "division/:seasonId/:seasonName",
//         //         element: <Divisions />,
//         //         handle: { crumb: "Divisions" },
//         //         children: [
//         //           {
//         //             path: "teams/seasons/:seasonId/division/:divisionId/:divisionName",
//         //             element: <Teams />,
//         //             handle: { crumb: "Teams" },
//         //           },
//         //         ],
//         //       },
//         //     ],
//         //   },
//         // ],
//       },
//     ],
//   },
// ]);
