import Leagues from "../Leagues/Leagues";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterModal from "../../components/RegistrationModal/RegistrationModal";
import { fetchUser } from "../../api/users/service";
import Cookies from "js-cookie";

const Home = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [registered, setRegistered] = useState<boolean | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (isAuthenticated && user) {
        try {
          Cookies.set("email", user.email || "");
          const token = await getAccessTokenSilently();
          const response = await fetchUser(user.email || "", token);
          setRegistered(response?.isSigningUp ? false : true);
        } catch (error) {
          console.error("Error checking registration status:", error);
          setRegistered(false);
        }
      } else {
        setRegistered(false);
      }
    };

    checkRegistrationStatus();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  useEffect(() => {
    if (registered === false && isAuthenticated) {
      setIsRegisterModalOpen(true);
    }
  }, [registered, isAuthenticated]);

  useEffect(() => {
    if (!isRegisterModalOpen && (registered === null || registered === false)) {
      setIsRegisterModalOpen(true);
    }
  }, [isRegisterModalOpen, registered]);

  const handleRegistrationComplete = () => {
    setRegistered(true);
    setIsRegisterModalOpen(false);
  };

  if (registered === null) {
    return <></>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div>
          {!registered && (
            <RegisterModal
              open={isRegisterModalOpen}
              onOpenChange={setIsRegisterModalOpen}
              onRegistrationComplete={handleRegistrationComplete}>
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
