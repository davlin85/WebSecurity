import React from "react";
import { Components } from "../../types/Types";

export const Card = (props: Components) => {
  return <div className="card">{props.children}</div>;
};
