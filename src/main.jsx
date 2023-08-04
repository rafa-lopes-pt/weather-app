import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./CSS/tailwind_output.css";
import { LocaleContextProvider } from "./Locale/LocaleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <LocaleContextProvider>
            <App />
        </LocaleContextProvider>
    </React.StrictMode>
);
