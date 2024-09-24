import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Layout from "../components/Layout/Layout";
import { Route } from "react-router-dom";
import Seasons from "./Seasons/Seasons";
import Users from "./Users/Users";
import Divisions from "./Division/Division";
import Teams from "./Teams/Teams";
import Forms from "./Forms/Forms";
import NewForm from "./NewForm/NewForm";
import Settings from "./Settings/Settings";
import FormPage from "./FormPage/FormPage";
import Plan from "./Settings/Plan/Plan";
import Payment from "./Settings/Payment/Payment";
import Leagues from "./Leagues/Leagues";

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
              crumb: () => {
                const { leagueId, leagueName } = useParams<{
                  leagueId: string;
                  leagueName: string;
                }>();
                return (
                  <Link to={`/season/${leagueId}/${leagueName}`}>
                    {leagueName}
                  </Link>
                );
              },
            }}>
            <Route
              path="division/:seasonId/:seasonName"
              element={<Divisions />}
              id="division"
              handle={{
                crumb: () => {
                  const { leagueId, leagueName, seasonId, seasonName } =
                    useParams<{
                      leagueId: string;
                      leagueName: string;
                      seasonId: string;
                      seasonName: string;
                    }>();
                  return (
                    <Link
                      to={`/season/${leagueId}/${leagueName}/division/${seasonId}/${seasonName}`}>
                      {seasonName}
                    </Link>
                  );
                },
              }}>
              <Route
                path="teams/seasons/:seasonId/division/:divisionId/:divisionName"
                element={<Teams />}
                id="team"
                handle={{
                  crumb: () => {
                    const {
                      leagueId,
                      leagueName,
                      seasonId,
                      seasonName,
                      divisionName,
                    } = useParams<{
                      leagueId: string;
                      leagueName: string;
                      seasonId: string;
                      seasonName: string;
                      divisionId: string;
                      divisionName: string;
                    }>();
                    return (
                      <Link
                        to={`/season/${leagueId}/${leagueName}/division/${seasonId}/${seasonName}`}>
                        {divisionName}
                      </Link>
                    );
                  },
                }}
              />
            </Route>
          </Route>
        </Route>

        <Route
          path="users"
          element={<Users />}
          handle={{ crumb: () => <Link to={"/users"}>Users</Link> }}
        />
        <Route path="forms" element={<Forms />} />
        <Route path="forms/check" element={<NewForm />} />
        <Route path="settings" element={<Settings />}>
          <Route index element={<Plan />} />
          <Route path="payment" element={<Payment />} />
          {/* <Route path="billing" element={<Plan />} /> */}
          {/* <Route path="help" element={<Plan />} /> */}
        </Route>
        <Route path="forms/:formId" element={<FormPage />} />
        <Route path="login" element={<Login />} />
      </Route>,
    ),
  );
