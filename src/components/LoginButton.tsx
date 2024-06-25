import {
  InteractionRequiredAuthError,
  InteractionStatus,
  RedirectRequest,
  SsoSilentRequest,
} from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";
import { loginRequest } from "../infrastructure/auth/authConfig";
import { Button } from "./Button";

export function LoginButton() {
  const { instance, inProgress } = useMsal();
  const account = useAccount();
  return (
    <Button
      label="Log in"
      disabled={inProgress !== InteractionStatus.None}
      onClick={async () => {
        try {
          const loginResponse = await instance.ssoSilent({
            ...loginRequest,
            loginHint: account?.username,
            account: account,
          } as SsoSilentRequest);

          loginResponse?.account &&
            instance.setActiveAccount(loginResponse.account);

          console.debug("sssoSilent Response", loginResponse);
        } catch (silentError) {
          if (silentError instanceof InteractionRequiredAuthError) {
            // Fallback to alternate method when silent call fails.
            try {
              // Favouring redirect over popup since popup is blocked by default in most browsers. YMMV.
              console.debug("Fall back to loginRedirect");
              await instance.loginRedirect({
                ...loginRequest,
                loginHint: account?.username,
                account,
              } as RedirectRequest);
            } catch (redirectError) {
              // TODO handle this error
              console.error("loginRedirect error", redirectError);
              throw redirectError;
            }
          } else {
            // TODO handle this error
            console.error("ssoSilent error", silentError);
            throw silentError;
          }
        }
      }}
    />
  );
}
