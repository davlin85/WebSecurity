import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../../../components/container/Container";
import { GetImages } from "../../../utils/functions/GetImages";

export const Images = () => {
  return (
    <section id="view">
      <Container>
        <div className="view-container">
          <div className="title">
            Images
          </div>
          <div className="create">
          <NavLink to="/images/create">New Image</NavLink>
          </div>
        </div>
        <div className="view-storage">
          {GetImages()}
        </div>
      </Container>
    </section>
  );
};
