import React from "react";
import ReactDOM from "react-dom/client"
import App from "./src/App"
import GlobalStyle from "./src/global/global.style"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
)