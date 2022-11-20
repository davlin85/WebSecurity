import React from "react";
import { Components } from "../../types/Types";

export const CardDetails = (props: Components) => {
  return <div className="carddetails">{props.children}</div>;
};
