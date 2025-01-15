import {
  createBrowserRouter,
  createRoutesFromElements,
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
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Plan from "./Settings/Plan/Plan";
import Payment from "./Settings/Payment/Payment";
import {
  HomeCrumb,
  UserCrumb,
  SeasonBreadcrumb,
  DivisionBreadcrumb,
  TeamBreadcrumb,
} from "../components/BreadCrumb/BreadCrumbComponents";

export const useRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} handle={{ crumb: <HomeCrumb /> }}>
            <Route
              path="season/:leagueId/:leagueName"
              element={<Seasons />}
              handle={{ crumb: <SeasonBreadcrumb /> }}>
              <Route
                path="division/:seasonId/:seasonName"
                element={<Divisions />}
                id="division"
                handle={{ crumb: <DivisionBreadcrumb /> }}>
                <Route
                  path="teams/seasons/:seasonId/division/:divisionId/:divisionName"
                  element={<Teams />}
                  id="team"
                  handle={{ crumb: <TeamBreadcrumb /> }}
                />
              </Route>
            </Route>
          </Route>
          <Route
            path="users"
            element={<Users />}
            handle={{ crumb: <UserCrumb /> }}
          />
          <Route path="forms" element={<Forms />} />
          <Route path="forms/check" element={<NewForm />} />
          <Route path="settings" element={<Settings />}>
            <Route index element={<Plan />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        </Route>
        <Route path="forms/:formId" element={<FormPage />} />
        <Route path="login" element={<Login />} />
      </Route>,
    ),
  );
