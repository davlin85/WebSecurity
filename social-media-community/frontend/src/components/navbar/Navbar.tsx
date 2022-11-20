import React from "react";
import { Menu } from "./Menu";
import { Logotype } from "./Logotype";
import { Container } from "../container/Container";

export const Navbar = () => {
  return (
    <section id="navbar">
      <Container>
      <div className="navbar-container">
        <Logotype />
        <Menu />
      </div>
      </Container>
    </section>
  );
};
