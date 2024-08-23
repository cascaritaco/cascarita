import { createBrowserRouter } from "react-router-dom";
import Leagues from "./Leagues/Leagues";
import Seasons from "./Seasons/Seasons";
import Divisions from "./Division/Division";
import Teams from "./Teams/Teams";
import Users from "./Users/Users";
import RootLayout from "../components/Layout/RootLayout";
import Login from "./Login/Login";

export const useRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Leagues />,
          handle: { crumb: "Dashboard" },
          // children: [
          //   {
          //     path: "season/:leagueId/:leagueName",
          //     element: <Seasons />,
          //     handle: { crumb: "Seasons" },
          //     children: [
          //       {
          //         path: "division/:seasonId/:seasonName",
          //         element: <Divisions />,
          //         handle: { crumb: "Divisions" },
          //         children: [
          //           {
          //             path: "teams/seasons/:seasonId/division/:divisionId/:divisionName",
          //             element: <Teams />,
          //             handle: { crumb: "Teams" },
          //           },
          //         ],
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);
