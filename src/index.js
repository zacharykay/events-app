import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { EventProvider } from "./contexts/event_context";

ReactDOM.render(
  <EventProvider>
    <App />
  </EventProvider>,
  document.getElementById("root")
);
