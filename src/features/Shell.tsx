import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
  ArrowsUpDownIcon,
  HomeIcon,
  UserIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet } from "@tanstack/react-router";
import { ToggleThemeButton } from "../components/Button";
import { LoginButton } from "../components/LoginButton";
import { UserMenu } from "../components/LogoutButton";
import { Spinner } from "../components/Spinner";

export function Shell() {
  const isAuthenticated = useIsAuthenticated();
  const msal = useMsal();
  const currentMsalOperationInProgress = msal.inProgress;

  return (
    <>
      <header className="w-full py-4 !text-stone-200 ">
        <nav className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between ">
            {/* <img
              src={entraLogo}
              className="w-8 mr-4 drop-shadow-md"
              alt="Entra logo"
            />
            <span className="text-sm text-stone-400">React MSAL Demo</span> */}
            <ul className="flex flex-wrap p-0 mr-1 space-x-4 text-sm list-none  ">
              <li className="after:content-['|'] after:ml-4  after:text-gray-500 flex items-center  ">
                <Link to="/" className="flex items-center gap-3 no-underline ">
                  <HomeIcon className="size-6" />
                  <span className="hidden sm:inline ">Welcome</span>
                </Link>
              </li>
              <li className="after:content-['|'] after:ml-4  after:text-gray-500 flex items-center ">
                <Link
                  to="/whymsal"
                  className="flex items-center gap-3 no-underline "
                >
                  <QuestionMarkCircleIcon className="size-6" />
                  <span className="hidden sm:inline">Why MSAL?</span>
                </Link>
              </li>
              <li className="after:content-['|'] after:ml-4 after:text-gray-500 flex items-center">
                <Link
                  to="/claims"
                  className="flex items-center gap-3 no-underline"
                >
                  <UserIcon className="size-6" />
                  <span className="hidden sm:inline">Claims</span>
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/msgraph"
                  className="flex items-center gap-3 no-underline"
                >
                  <ArrowsUpDownIcon className="size-6" />
                  <span className="hidden sm:inline">MS Graph</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-between gap-4">
            <ToggleThemeButton />
            {/*
          Often you want to show different content to users based on whether they are authenticated or not.
          The `AuthenticatedTemplate` and `UnauthenticatedTemplate` components provided by msal-react can help with this.
          Sometimes, though, it's easier to just use the `useIsAuthenticated` hook to conditionally render content.
          */}
            {isAuthenticated ? <UserMenu /> : <LoginButton />}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      {currentMsalOperationInProgress !== InteractionStatus.None && <Spinner />}

      <footer className="flex items-center justify-center px-8 py-2 mt-2 text-xs text-gray-200">
        View source on&nbsp;
        <a
          target="_blank"
          rel="noopener"
          href="https://github.com/pm7y/React-MSAL-Example"
        >
          GitHub
        </a>
      </footer>
    </>
  );
}
