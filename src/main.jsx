import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./Css/components/loading.css";
import "./Css/components/button.css";
import "./Css/components/alerts.css";
import "./Css/components/google.css";
import "./Pages/Auth/AuthOperations/auth.css";
import "./Pages/Dashboard/dashboard.css";
import "bootstrap/dist/css/bootstrap.css";
import "animate.css";
import "./custom.css";
import MenuContext from "./context/menucontext";
import WindowResize from "./context/windowresize";
import CartContext from './context/addToCartContext';

const rootElement = document.getElementById("root");

  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
    <WindowResize>
    <MenuContext>
    <CartContext>
    <App />
    </CartContext>
    </MenuContext>
    </WindowResize>
      </BrowserRouter>
    </StrictMode>
  );

