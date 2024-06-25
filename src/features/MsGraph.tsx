import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import React, { useEffect } from "react";
import { useGraphUserDetails } from "../api/useGraphUserDetails";
import { useGraphUserPhoto } from "../api/useGraphUserPhoto";
import { Spinner } from "../components/Spinner";
import { CodeBox } from "../components/CodeBox";

function MsGraph() {
  const { user, isLoading } = useGraphUserDetails();
  const photoBlobUrl = useGraphUserPhoto();
  const avatarDiv = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (avatarDiv.current) {
      avatarDiv.current.style.background = `url(${photoBlobUrl}) no-repeat center center / cover`;
    }
  }, [avatarDiv, photoBlobUrl]);

  return (
    <>
      <h1>Call an API</h1>
      <UnauthenticatedTemplate>
        <div>✋ You must be logged in to see this content.</div>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <p>
          Once you have an access token you can use that token to call an API.
          This is a simple example of calling the{" "}
          <a
            href="https://developer.microsoft.com/en-us/graph/graph-explorer"
            rel="noopener"
            target="_blank"
          >
            Microsoft Graph API
          </a>{" "}
          to retrieve some profile data about the user including their photo if
          there is one.
        </p>
        <p>
          Note:{" "}
          <i>
            The amount of fields populated below will depend on what has been
            populated in Entra Id
          </i>
          .
        </p>
        {isLoading ? (
          <Spinner msg="Fetching user info..." />
        ) : user ? (
          <>
            {photoBlobUrl && (
              <div
                className="w-[64px] aspect-square rounded-full border border-gray-200"
                ref={avatarDiv}
              />
            )}
            <CodeBox code={JSON.stringify(user, null, 2)} />
          </>
        ) : (
          <div>User details could not be retrieved 🫤</div>
        )}
      </AuthenticatedTemplate>
    </>
  );
}

export default MsGraph;
