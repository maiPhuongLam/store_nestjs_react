import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
