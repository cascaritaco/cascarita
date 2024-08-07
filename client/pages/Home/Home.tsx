import Leagues from "../Leagues/Leagues";
import { useAuth } from "../../components/AuthContext/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <div>
          <Leagues />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
