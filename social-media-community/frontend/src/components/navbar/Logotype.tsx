import React from "react";
import { NavLink } from "react-router-dom";

export const Logotype = () => {
  return (
    <section id="logotype">
      <div className="logotype-container">
        <NavLink to="/" className="logotype-navlink">
          Social Media Community.
        </NavLink>
      </div>
    </section>
  );
};
