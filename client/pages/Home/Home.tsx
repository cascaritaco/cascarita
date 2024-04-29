import Leagues from "../Leagues/Leagues";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
  }

  return (
    <div>
      <Leagues />
    </div>
  );
};

export default Home;
