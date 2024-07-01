import Leagues from "../Leagues/Leagues";
// import Seasons from "../Seasons/Seasons";
import { useAuth } from "../../components/AuthContext/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return <div>{currentUser ? <Leagues /> : <></>}</div>;
};

export default Home;
