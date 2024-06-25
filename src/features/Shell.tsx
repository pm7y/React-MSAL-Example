import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Link, Outlet } from "@tanstack/react-router";
import entraLogo from "../assets/entra.svg";
import { LoginButton } from "../components/LoginButton";
import { LogoutButton } from "../components/LogoutButton";
import { Spinner } from "../components/Spinner";

export function Shell() {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  return (
    <>
      <header className="w-full">
        <nav className="flex items-center justify-between w-full ">
          <div className="flex items-center justify-between">
            <a
              href="https://learn.microsoft.com/en-us/entra/identity-platform/msal-overview"
              rel="noopener"
              target="_blank"
              className="mr-4">
              <img src={entraLogo} className="w-12" alt="Entra logo" />
            </a>

            <ul className="flex flex-wrap p-0 mr-1 space-x-4 list-none ">
              <li className="after:content-['|'] after:ml-4">
                <Link to="/">Welcome</Link>
              </li>
              <li className="after:content-['|'] after:ml-4">
                <Link to="/claims">Token Claims</Link>
              </li>
              <li>
                <Link to="/msgraph">Call an API</Link>
              </li>
            </ul>
          </div>
          {/*
          Often you want to show different content to users based on whether they are authenticated or not.
          The `AuthenticatedTemplate` and `UnauthenticatedTemplate` components provided by msal-react can help with this.
          Sometimes it's easier to just use the `useIsAuthenticated` hook to conditionally render content.
          */}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      {inProgress !== InteractionStatus.None && <Spinner />}
    </>
  );
}
