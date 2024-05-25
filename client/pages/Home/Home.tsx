import Leagues from "../Leagues/Leagues";
// import { useAuth } from "../../components/AuthContext/AuthContext";

const Home = () => {
  // const { currentUser } = useAuth();
  const currentUser = "test";

  return <div>{currentUser ? <Leagues /> : <></>}</div>;
};

export default Home;
