import Leagues from "../Leagues/Leagues";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterModal from "../../components/RegistrationModal/RegistrationModal";
import { fetchUser } from "../../api/users/service";

const Home = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [registered, setRegistered] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [authorization, setAuthorization] = useState<string>("");

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          console.log(`Token: ${token}`);
          const response = await fetchUser(user.email || "", token); // Ensure `fetchUser` is typed appropriately
          setAuthorization(response.authorization);

          if (response.isSigningUp) {
            setRegistered(false);
          } else {
            setRegistered(true);
          }
        } catch (error) {
          console.error("Error checking registration status:", error);
        }
      }
    };

    checkRegistrationStatus();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  // Move the modal opening logic to a useEffect hook to avoid triggering re-renders
  useEffect(() => {
    if (!registered && isAuthenticated) {
      console.log("Open up the registration Modal");
      setIsRegisterModalOpen(true);
    }
  }, [registered, isAuthenticated, isRegisterModalOpen]);

  // Function to handle registration completion
  const handleRegistrationComplete = () => {
    setRegistered(true);
    setIsRegisterModalOpen(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          {!registered && (
            <RegisterModal
              open={isRegisterModalOpen}
              onOpenChange={setIsRegisterModalOpen}
              onRegistrationComplete={handleRegistrationComplete}
              authorization={authorization}>
              <></>
            </RegisterModal>
          )}
          <Leagues />
          <Outlet />
        </div>
      ) : (
        <p>Not authenticated...</p>
      )}
    </>
  );
};

export default Home;
