import React from "react";
import { Components } from "../../types/Types";

export const Container = (props: Components) => {
  return <div className="container">{props.children}</div>;
};
