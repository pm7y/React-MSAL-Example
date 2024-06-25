import { createStandardPublicClientApplication } from "@azure/msal-browser";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { CustomNavigationClient } from "./CustomNavigationClient.tsx";
import "./index.css";
import ErrorBoundary from "./infrastructure/ErrorBoundary.tsx";
import { MsalWrapper } from "./infrastructure/auth/MsalWrapper.tsx";
import { msalConfig } from "./infrastructure/auth/authConfig.ts";
import { getRoutes } from "./routes.tsx";
// import "@fontsource-variable/open-sans/wdth-italic.css";
// import "@fontsource-variable/open-sans/wdth.css";
import "@fontsource-variable/open-sans";

/*
  createStandardPublicClientApplication returns an already initialized instance of PublicClientApplication.
  https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md
  */
createStandardPublicClientApplication(msalConfig)
  .then((pca) => {
    const router = createRouter({
      routeTree: getRoutes(),
    });

    const navigationClient = new CustomNavigationClient(router);
    // Must set the navigation client before calling handleRedirectPromise
    pca.setNavigationClient(navigationClient);

    pca.handleRedirectPromise().then((authResult) => {
      if (authResult?.account) {
        console.debug("Redirect auth result - setActiveAccount: ", authResult);
        pca.setActiveAccount(authResult.account);
      }
    });

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <ErrorBoundary>
          <MsalWrapper msalInstance={pca}>
            <RouterProvider router={router} />
          </MsalWrapper>
        </ErrorBoundary>
      </React.StrictMode>
    );
  })
  .catch((unknownError: unknown) => {
    console.error("Error handling redirect promise", unknownError);
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <>
        <h1>Oops, Something went wrong 😭</h1>
        <p>The app could not be initialised.</p>
      </>
    );
  });
