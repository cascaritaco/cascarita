import React, { StrictMode } from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./history";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

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
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

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

root.render(
  <Auth0Provider {...providerConfig}>
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
