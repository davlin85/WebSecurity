import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../../../components/container/Container";
import { PutMessage } from "../../../utils/functions/PutMessage";

export const MessageUpdate = () => {
  return (
    <section id="viewcontent">
      <Container>
        <div className="viewcontent-container">
          <div className="title">
            Update Message
          </div>
          <div className="create">
          <NavLink to="/messages">Back to Messages</NavLink>
          </div>
        </div>
        <div className="viewcontent-storage">
          {PutMessage()}
        </div>
      </Container>
    </section>
  );
};
