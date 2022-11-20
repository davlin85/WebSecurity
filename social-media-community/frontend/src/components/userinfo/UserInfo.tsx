import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../container/Container";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../loading/Loading";

export const UserInfo = () => {
  const { user, logout, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section id="userinfo">
      <Container>
        <div className="userinfo-container">
          <div className="user">{user?.email}</div>
          <div className="user-signout">
            <ul>
              <li>
                <NavLink
                  to="/"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Sign Out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
