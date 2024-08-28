import Leagues from "../Leagues/Leagues";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

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
