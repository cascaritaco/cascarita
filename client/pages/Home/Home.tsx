import Leagues from "../Leagues/Leagues";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  // const history = useNavigate(); // For react-router v6, use useNavigate instead.

  // At the time we are authenticated we want to store this users data info
  useEffect(() => {
    if (isAuthenticated) {
      console.log("user from AuthZero: ", user);
    }
  }, [isAuthenticated]);
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     // If not authenticated, redirect the user to the login page
  //     loginWithRedirect();
  //   }
  // }, [isLoading, isAuthenticated, loginWithRedirect]);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Leagues />
          <Outlet />
          <></>
        </div>
      ) : (
        <>
          <p>NOT AUTHENTICATED</p>
        </>
      )}
    </>
  );
};

export default Home;
