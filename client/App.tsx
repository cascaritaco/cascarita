import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Schedule from "./pages/Schedule/Schedule";
import Forms from "./pages/Forms/Forms";
import Settings from "./pages/Settings/Settings";
import Layout from "./components/Layout/Layout";
import { useState } from "react";
import Login from "./pages/Login/Login";
import { AuthProvider, useAuth } from "./components/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const AppContent = () => {
  const { currentUser } = useAuth();
  const [selectedItem, setSelectedItem] = useState("home");

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
      {/* Add Public facing routes here */}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
