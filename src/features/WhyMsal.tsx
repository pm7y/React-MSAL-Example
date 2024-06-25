import { Page } from "./Page";

function WhyMsal() {
  return (
    <Page
      header={<h1>Why MSAL?</h1>}
      content={
        <>
          <p>
            Broadly speaking there are a couple of different ways of
            authenticating users in a React/Typescript SPA using Entra Id. One
            way is to delegate the authenticate to the frontend using MSAL.
            Another way would be to delegate the responsibility to your backend
            API (e.g. ASP.NET). There are pros and cons to each approach and
            which one you choose will depend on your specific requirements.
          </p>
          <p>
            This demo site is solely focused on exploring the first way i.e. how
            to authenticate via the frontend using MSAL.
          </p>
          <p>
            Here are a few of the things you might consider when choosing one
            way or the other.
          </p>
          <p>Choose SPA Authentication if:</p>
          <ul className="list-disc  pl-8">
            <li>
              Seamless User Experience: You need a smooth user experience with
              fewer redirects, making the authentication process feel more
              integrated and less disruptive.
            </li>
            <li>
              Direct Token Management: You prefer the frontend to directly
              handle tokens, managing authentication flows and token refresh
              within the SPA.
            </li>
            <li>
              Simplified Backend: Your application benefits from a stateless
              backend, reducing the complexity of server-side session
              management.
            </li>
          </ul>
          <br />
          <p>Choose API-Based Authentication if:</p>
          <ul className="list-disc pl-8">
            <li>
              Centralised Security Control: You prefer centralised control over
              security and session management, keeping sensitive authentication
              logic and token handling on the server side.
            </li>
            <li>
              Simplified Frontend Development: You aim to simplify frontend
              development by offloading authentication complexity to the
              backend, allowing the frontend to focus solely on user interface
              and user experience.
            </li>
            <li>
              You aim to simplify frontend development and offload
              authentication complexity to the backend.
            </li>
          </ul>
        </>
      }
    />
  );
}

export default WhyMsal;
