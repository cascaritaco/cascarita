import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
} from "react-router-dom";
import Users from "./pages/Users/Users";
import Schedule from "./pages/Schedule/Schedule";
import Forms from "./pages/Forms/Forms";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import NewForm from "./pages/NewForm/NewForm";
import Seasons from "./pages/Seasons/Seasons";
import Divisions from "./pages/Division/Division";
import FormPage from "./pages/FormPage/FormPage";
import Teams from "./pages/Teams/Teams";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n/config";
import RootLayout from "./components/Layout/RootLayout";
import Leagues from "./pages/Leagues/Leagues";
import { useRouter } from "./pages/Routes";

const queryClient = new QueryClient();

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<RootLayout />}>
//       <Route
//         path="/"
//         element={<Leagues />}
//         id="home"
//         handle={{ crumb: () => <Link to="/">Home</Link> }}>
//         <Route
//           path="season/:leagueId/:leagueName"
//           element={<Seasons />}
//           id="season"
//           handle={{
//             crumb: (leagueId: string, leagueName: string) => (
//               <Link to={`season/${leagueId}/${leagueName}`}>Seasons</Link>
//             ),
//           }}
//         />
//       </Route>

//       <Route
//         path="division/:seasonId/:seasonName"
//         element={<Divisions />}
//         id="division"
//         handle={{
//           crumb: () => (
//             <Link to="division/:seasonId/:seasonName">Divisions</Link>
//           ),
//         }}
//       />
//       <Route
//         path="teams/seasons/:seasonId/division/:divisionId/:divisionName"
//         element={<Teams />}
//         id="team"
//         handle={{
//           crumb: () => (
//             <Link to="teams/seasons/:seasonId/division/:divisionId/:divisionName">
//               Teams
//             </Link>
//           ),
//         }}
//       />
//       <Route path="users" element={<Users />} />
//       <Route path="schedule" element={<Schedule />} />
//       <Route path="forms" element={<Forms />} />
//       <Route path="forms/check" element={<NewForm />} />
//       <Route path="settings" element={<Settings />} />
//       <Route path="login" element={<Login />} />
//       <Route path="forms/:formId" element={<FormPage />} />
//     </Route>,
//   ),
// );

const routes = useRouter();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={routes} />;
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
