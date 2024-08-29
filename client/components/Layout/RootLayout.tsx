import React from "react";
import { LayoutProps } from "./types";
import Layout from "./Layout";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../AuthContext/AuthContext";

const RootLayout: React.FC<LayoutProps> = () => {
  return (
    <div>
      <AuthProvider>
        <Layout>
          <Outlet />
        </Layout>
      </AuthProvider>
    </div>
  );
};

export default RootLayout;
