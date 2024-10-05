import Leagues from "../Leagues/Leagues";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchUser } from "../../api/users/service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log(isAuthenticated, user);
      const token = await getAccessTokenSilently();
      const navigate = useNavigate();
      console.log("Authorizaton token: ", token);
      if (isAuthenticated && user) {
        // Check if user is defined
        console.log("Authenticated and user");
        try {
          const currentUser = await fetchUser(user.email || "", token);
          // Handle the user data here
          console.log("Saul was here");
          // if (currentUser.isSigningUp) {
          navigate("/forms");
          // }
          console.log(currentUser);
        } catch (error) {
          // Handle errors here
          console.error("Error fetching user:", error);
        }
      } else {
        loginWithRedirect();
      }
    };
    console.log("Inside this useEffect");
    fetchCurrentUser();
  }, [isAuthenticated, user]);

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
          <p>Not authenticated...</p>
        </>
      )}
    </>
  );
};

export default Home;
