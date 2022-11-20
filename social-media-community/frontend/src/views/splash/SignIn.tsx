import React from "react";
import { Container } from "../../components/container/Container";
import { Authentication } from "../../utils/functions/Authentication";

export const SignIn = () => {
  return (
    <section id="signin">
      <Container>
        <div className="signin-container">{Authentication()}</div>
      </Container>
    </section>
  );
};
