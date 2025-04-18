import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="74767315258-u4vkl3b06a8uka57o9295ct8irstkd6c.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
);
