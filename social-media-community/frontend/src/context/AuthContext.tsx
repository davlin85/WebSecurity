import React from "react";
import { Components } from "../types/Types";
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth } from "./../services/auth/Auth";

const domain = Auth.domain;
const clientid = Auth.clientid;
const audience = Auth.audience;

const AuthContext = (props: Components) => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientid}
      redirectUri={window.location.origin}
      audience={audience}
      useRefreshTokens={true}
    >
      {props.children}
    </Auth0Provider>
  );
};

export default AuthContext;