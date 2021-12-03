import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App"; // Named import
import { AppStateProvider } from "./state/AppStateContext";

ReactDOM.render(
  <React.StrictMode>
    {/* With <AppStateProvider>, Now we’ll be able to get the "lists" and "getTasksByListId" from any component.*/}
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
