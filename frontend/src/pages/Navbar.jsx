import React from "react";

const Navbar = () => {
  return (
    <div className="homeNavbar">
      <h3>Bioscope Handy craft</h3>
      <p>bioscopehandycrafts.com</p>
      <nav className="navItems">
        <a href="#">Categories</a>
        <a href="#">Deals</a>
        <a href="#">What's New</a>
        <a href="#">Delivery</a>
      </nav>
      <div>
        <input type="text" placeholder="Search Product" />
        <button>Account</button>
        <button>Cart</button>
      </div>
    </div>
  );
};

export default Navbar;
