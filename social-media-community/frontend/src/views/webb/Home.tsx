import React from "react";
import { Container } from "../../components/container/Container";
import { GetImagesThree } from "../../utils/functions/GetImagesThree";
import { GetMessagesThree } from "../../utils/functions/GetMessagesThree";

export const Home = () => {
  return (
    <section id="view">
      <Container>
        <div className="view-container">
          <div className="title">
          Three Most Recent Messages
          </div>
        </div>
        <div className="view-storage">
          {GetMessagesThree()}
        </div>
        <div className="view-container">
          <div className="title" style={{marginTop: '1.5rem'}}>
          Three Most Recent Images
          </div>
        </div>
        <div className="view-storage">
          {GetImagesThree()}
        </div>
      </Container>
    </section>
  );
};
