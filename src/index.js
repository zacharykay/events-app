import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { EventProvider } from "./contexts/event_context";

ReactDOM.render(
  <React.StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
