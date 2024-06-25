import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Schedule from "./pages/Schedule/Schedule";
import Forms from "./pages/Forms/Forms";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import Layout from "./components/Layout/Layout";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n/config";
import NewForm from "./pages/NewForm/NewForm";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import FormPage from "./pages/FormPage/FormPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nextProvider i18n={i18next}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/forms/check" element={<NewForm />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/form/:formId" element={<FormPage />} />
            </Routes>
          </Layout>
        </I18nextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
