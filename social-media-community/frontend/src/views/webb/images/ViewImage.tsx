import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../../../components/container/Container";
import { ImageDetails } from "../../../utils/functions/ImageDetails";

export const ViewImage = () => {
  return (
    <section id="viewcontent">
      <Container>
        <div className="viewcontent-container">
          <div className="title">
            Image Details
          </div>
          <div className="create">
          <NavLink to="/images">Back to Images</NavLink>
          </div>
        </div>
        <div className="viewcontent-storage">
          {ImageDetails()}
        </div>
      </Container>
    </section>
  );
};
