import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useAccount,
} from "@azure/msal-react";

function Welcome() {
  const account = useAccount();

  return (
    <>
      <UnauthenticatedTemplate>
        <h1>Hey 👋 </h1>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <h1>Hey {account?.idTokenClaims?.name} 👋</h1>
      </AuthenticatedTemplate>

      <p>
        This site aims to provide a useful example of integrating a
        React/Typescript app with the{" "}
        <a
          target="_blank"
          rel="noopener"
          href="https://learn.microsoft.com/en-us/entra/identity-platform/msal-overview"
        >
          Microsoft Authentication Library (MSAL)
        </a>{" "}
        library to authenticate users via Microsoft Entra Id.
      </p>
      <p>
        The starting point of this repo is a React/Typescript app created using
        `Vite`. I've tried to keep the app simple and I've avoided making
        changes to the underlying Vite template where possible. This is to avoid
        introducing distracting concerns that would take focus away from the
        main intent, which is to demonstrate how to integrate with MSAL.
      </p>
      <h2>Next steps </h2>
      <p>
        <a
          target="_blank"
          rel="noopener"
          href="https://github.com/pm7y/React-MSAL-Example"
        >
          Take a look at the code
        </a>{" "}
        or explore the other pages/features using the links above.
      </p>
      <p>
        <a target="_blank" rel="noopener" href="https://aka.ms/aadcodesamples">
          Other MSAL code samples
        </a>
        .
      </p>
    </>
  );
}

export default Welcome;
