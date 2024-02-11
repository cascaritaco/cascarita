import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Matches from "./pages/Matches/Matches";

const App = () => {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </>
  );
};

export default App;
