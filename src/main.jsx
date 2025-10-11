import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

// const primeReactConfig = {
//   hideOverlaysOnDocumentScrolling: false, // Tắt tự động ẩn overlay để tránh xung đột
// };

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
