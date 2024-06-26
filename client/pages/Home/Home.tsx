import Leagues from "../Leagues/Leagues";
import { useAuth } from "../../components/AuthContext/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <div>
          {/* <h1> Welcome {currentUser.first_name} </h1> <Leagues /> */}
          <Leagues />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
