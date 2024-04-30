import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Schedule from "./pages/Schedule/Schedule";
import Forms from "./pages/Forms/Forms";
import Settings from "./pages/Settings/Settings";
import SideNav from "./components/SideNav/SideNav";
import TopNav from "./components/TopNav/TopNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${selectedItem.toLowerCase()}`);
  }, [selectedItem]);

  return (
    <div>
      <TopNav />
      <SideNav selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
