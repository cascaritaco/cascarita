import Page from "../../components/Page/Page";
import Navbar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <Page title="Settings">
      <Navbar>
        <Navbar.Item href="">Plan</Navbar.Item>
        <Navbar.Item href="payment">Payment Methods</Navbar.Item>
      </Navbar>

      <Outlet />
    </Page>
  );
};

export default Settings;
