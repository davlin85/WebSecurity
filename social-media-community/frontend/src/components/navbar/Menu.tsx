import React from "react";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <section id="menu">
      <div className="menu-container">
        <ul>
          <li>
            <NavLink to="/messages" className="navlink">
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/images" className="navlink">
              Images
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};
