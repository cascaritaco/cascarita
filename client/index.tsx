import React, { StrictMode } from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
// import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./history";
// import "./index.css"

interface ImportMetaEnv {
  REACT_APP_AUTH0_DOMAIN: string;
  REACT_APP_AUTH0_CLIENT_ID: string;
  REACT_APP_AUTH0_AUDIENCE?: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

type AppState = {
  returnTo?: string;
};

const onRedirectCallback = (appState: AppState | undefined) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname,
  );
};

const providerConfig = (() => {
  const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    throw new Error("Missing Auth0 environment variables");
  }

  return {
    domain,
    clientId,
    onRedirectCallback,
    authorizationParams: {
      redirect_uri: window.location.origin,
      ...(audience ? { audience } : null),
    },
  };
})();

createRoot(document.getElementById("root")!).render(
  <Auth0Provider {...providerConfig}>
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
