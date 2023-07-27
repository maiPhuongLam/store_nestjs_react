import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import { useEffect } from "react";
import { UserActionType } from "./global-state/reducers/userRecucer";
import { useUserContext } from "./hooks/useUserContext";
import { useCartContext } from "./hooks/useCartContext";
import { User } from "./global-state/Contexts/UserContext";
import { useCart } from "./hooks/useCart";
import { CartActionType, CartState } from "./global-state/reducers/cartReducer";

function App() {
  const { userState, userDispatch } = useUserContext();
  const { cartState, cartDispatch } = useCartContext();
  const { getCart } = useCart();
  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      userDispatch({ type: UserActionType.USER_LOGIN, payload: user });
    }
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    const cartId = localStorage.getItem("cart");
    if (cartId && userState?.accessToken) {
      const fetchCart = async () => {
        const cart = await getCart(cartId, userState?.accessToken as string);
        if (cart.error) {
          return;
        }
        cartDispatch({ type: CartActionType.SET_CART, payload: cart });
      };
      fetchCart();
      return () => controller.abort();
    }
  }, [userState]);
  console.log(userState);
  console.log(cartState);
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={"/" || "home"} element={<Home />} />
          <Route path={"/product/:id"} element={<ProductDetail />} />
          <Route path={"/cart"} element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
