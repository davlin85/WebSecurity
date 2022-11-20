import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import AuthContext from "./context/AuthContext";
import "../src/assets/css/Style.css";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>
);
