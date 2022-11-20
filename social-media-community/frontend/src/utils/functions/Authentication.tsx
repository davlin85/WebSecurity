import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CardSignIn } from "../../components/card/CardSignIn";

export const Authentication = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <CardSignIn>
      <div className="img">
        <img src={require("../../assets/img/userimg.png")} width="75" alt="" />
        <div className="userinfo">
          <div className="logotype">Social Media Community</div>
        </div>
      </div>
      <div className="content">Welcome to Social Media Community!</div>
      <div className="edit">
        <div className="signin">
          <button onClick={() => loginWithRedirect()} className="btn">
            Sign In
          </button>
        </div>
      </div>
    </CardSignIn>
  );
};
