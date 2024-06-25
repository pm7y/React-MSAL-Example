import { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";
import { AccessTokenProvider } from "./AccessTokenProvider";

interface IMsalWrapperProps {
  msalInstance: IPublicClientApplication;
  children: ReactNode;
}

export function MsalWrapper({
  msalInstance,
  children,
}: Readonly<IMsalWrapperProps>) {
  return (
    <MsalProvider instance={msalInstance}>
      <AccessTokenProvider>{children}</AccessTokenProvider>
    </MsalProvider>
  );
}
