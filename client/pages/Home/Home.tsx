import Leagues from "../Leagues/Leagues";
import { useAuth } from "../../components/AuthContext/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div>{currentUser ? <Leagues currentUser={currentUser} /> : <></>}</div>
  );
};

export default Home;
