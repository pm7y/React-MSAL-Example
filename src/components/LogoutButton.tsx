import { EndSessionRequest, InteractionStatus } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";
import { loginRequest } from "../infrastructure/auth/authConfig";
import { Button } from "./Button";

export function LogoutButton() {
  const { instance, inProgress } = useMsal();
  const account = useAccount();
  return (
    <Button
      label="Log out"
      disabled={inProgress !== InteractionStatus.None}
      onClick={async () => {
        try {
          await instance.logoutRedirect({
            ...loginRequest,
            logoutHint: account?.username,
          } as EndSessionRequest);
        } catch (redirectError) {
          // TODO handle this error
          console.error("logout error", redirectError);
          throw redirectError;
        }
      }}
    />
  );
}
