import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../../../components/container/Container";
import { PostMessage } from "../../../utils/functions/PostMessage";

export const CreateMessage = () => {
  return (
    <section id="viewcontent">
      <Container>
        <div className="viewcontent-container">
          <div className="title">
            Create Message
          </div>
          <div className="create">
          <NavLink to="/messages">Back to Messages</NavLink>
          </div>
        </div>
        <div className="viewcontent-storage">
          {PostMessage()}
        </div>
      </Container>
    </section>
  );
};
