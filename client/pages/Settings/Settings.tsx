import React from "react";
import styles from "./Settings.module.css";
import Page from "../../components/Page/Page";
import Navbar from "../../components/NavBar/NavBar";

const Settings = () => {
  return (
    <Page title="Settings">
      <Navbar>
        <Navbar.Item href="#">Plan</Navbar.Item>
        <Navbar.Item href="#">Payment Methods</Navbar.Item>
        <Navbar.Item href="#">Billing</Navbar.Item>
        <Navbar.Item href="#">Help</Navbar.Item>
      </Navbar>
    </Page>
  );
};

export default Settings;
