import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../../../components/container/Container";
import { PostImage } from "../../../utils/functions/PostImage";

export const CreateImage = () => {
  return (
    <section id="viewcontent">
      <Container>
        <div className="viewcontent-container">
          <div className="title">
            Create Image
          </div>
          <div className="create">
          <NavLink to="/images">Back to Images</NavLink>
          </div>
        </div>
        <div className="viewcontent-storage">
          {PostImage()}
        </div>
      </Container>
    </section>
  );
};
