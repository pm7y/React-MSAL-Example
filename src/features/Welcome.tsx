import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useAccount,
} from "@azure/msal-react";
import { Page } from "./Page";

function Welcome() {
  const account = useAccount();
  const userFirstName = account?.idTokenClaims?.name?.split(" ")[0];

  return (
    <Page
      header={
        <>
          <UnauthenticatedTemplate>
            <h1>
              Welcome <span className="ml-4 drop-shadow-md">👋</span>
            </h1>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <h1>
              Hey, {userFirstName}{" "}
              <span className="ml-4 drop-shadow-md">👋</span>
            </h1>
          </AuthenticatedTemplate>
        </>
      }
      content={
        <>
          <p>
            Welcome to this demo site, showcasing the integration of a
            React/TypeScript app with the Microsoft Authentication Library
            (MSAL) for authenticating users via Microsoft Entra ID.
          </p>
          <p>
            This project starts with a React/TypeScript app created using Vite.
            We've kept the app straightforward, avoiding significant changes to
            the default Vite template. This ensures the focus remains on the
            primary goal: demonstrating seamless integration with MSAL.
          </p>
          <h2>Next, you could... </h2>
          <ul className="list-disc  pl-8">
            <li>
              Take a look at{" "}
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/pm7y/React-MSAL-Example"
              >
                the code
              </a>{" "}
              for this site,
            </li>
            <li>
              Explore the other pages using the links at the top the page,
            </li>
            <li>
              Read more about the{" "}
              <a
                target="_blank"
                rel="noopener"
                href="https://learn.microsoft.com/en-us/entra/identity-platform/msal-overview"
              >
                Microsoft Authentication Library (MSAL)
              </a>
              ,
            </li>

            <li>
              Look at some other{" "}
              <a
                target="_blank"
                rel="noopener"
                href="https://aka.ms/aadcodesamples"
              >
                MSAL code samples from Microsoft
              </a>
              .
            </li>
          </ul>
        </>
      }
    />
  );
}

export default Welcome;
