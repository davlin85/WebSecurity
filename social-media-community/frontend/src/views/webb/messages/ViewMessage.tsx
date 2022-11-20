import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../../../components/container/Container";
import { MessageDetails } from "../../../utils/functions/MessageDetails";

export const ViewMessage = () => {
  return (
    <section id="viewcontent">
      <Container>
        <div className="viewcontent-container">
          <div className="title">
            Message Details
          </div>
          <div className="create">
          <NavLink to="/messages">Back to Messages</NavLink>
          </div>
        </div>
        <div className="viewcontent-storage">
          {MessageDetails()}
        </div>
      </Container>
    </section>
  );
};
