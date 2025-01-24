import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Get the root element
// const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
const rootElement = document.getElementById('root'); // Ensure the ID matches the one in your HTML file
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

