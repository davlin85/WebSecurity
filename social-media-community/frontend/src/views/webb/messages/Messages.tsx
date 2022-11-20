import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../../../components/container/Container";
import { GetMessages } from "../../../utils/functions/GetMessages";

export const Messages = () => {
  return (
    <section id="view">
      <Container>
        <div className="view-container">
          <div className="title">
            Messages
          </div>
          <div className="create">
          <NavLink to="/messages/create">New Message</NavLink>
          </div>
        </div>
        <div className="view-storage">
          {GetMessages()}
        </div>
      </Container>
    </section>
  );
};
