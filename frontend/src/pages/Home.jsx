import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Filters from "./Filters";
import ProductList from "./ProductList";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Filters />
      <ProductList />
    </div>
  );
};

export default Home;
