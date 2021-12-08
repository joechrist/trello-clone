import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App"; // Named import
import { AppStateProvider } from "./state/AppStateContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend as Backend } from "react-dnd-html5-backend";

ReactDOM.render(
  <React.StrictMode>
    {/* This provider will add a dragging context to our app. It will allow us to use useDrag and useDrop hooks inside our components. */}
    <DndProvider backend={Backend}>
      {/* With <AppStateProvider>, Now we’ll be able to get the "lists" and "getTasksByListId" from any component.*/}
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
