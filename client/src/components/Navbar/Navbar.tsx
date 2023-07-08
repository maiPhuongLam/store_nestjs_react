import React from "react";
import "./navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <h2>Logo</h2>
      </div>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
