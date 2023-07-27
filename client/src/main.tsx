import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserContextProvider from "./global-state/Contexts/UserContext.tsx";
import ProductContextProvider from "./global-state/Contexts/ProductContext.tsx";
import CartContextProvider from "./global-state/Contexts/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartContextProvider>
    <UserContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </UserContextProvider>
  </CartContextProvider>
);
