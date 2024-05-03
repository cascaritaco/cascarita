import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Schedule from "./pages/Schedule/Schedule";
import Forms from "./pages/Forms/Forms";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
