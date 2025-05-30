import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="74767315258-p096i9js7a4f52n2mpcu8foo45nqem8g.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
);
