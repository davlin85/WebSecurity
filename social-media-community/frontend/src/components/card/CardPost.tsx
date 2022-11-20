import React from "react";
import { Components } from "../../types/Types";

export const CardPost = (props: Components) => {
  return <div className="cardpost">{props.children}</div>;
};
