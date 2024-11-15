import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const products = [
  {
    name: "Wireless Earbuds",
    price: 89,
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "AirPods Max",
    price: 559,
    image:
      "https://images.pexels.com/photos/1646704/pexels-photo-1646704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Bose BT Earphones",
    price: 289,
    image:
      "https://images.pexels.com/photos/26832584/pexels-photo-26832584/free-photo-of-close-up-of-a-huawei-smartphone-and-wireless-headphones.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "VIVEFOX Headphones",
    price: 39,
    image:
      "https://media.istockphoto.com/id/1187676340/fi/valokuva/kuulokkeet-ovat-v%C3%A4rilt%C3%A4%C3%A4n-tummat-betonisein%C3%A4%C3%A4-vasten.jpg?s=1024x1024&w=is&k=20&c=JCCkggR9PHntmn3vRQn72PXyEmX4Uz0Sl0mPQ04c0z8=",
  },
];

const ProductList = () => {
  const [productss, setProductss] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProductss(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <hr />

      <div>
        {products.length > 0 ? (
          productss.map((product) => (
            <div key={product._id}>
              <h3>{product.pName}</h3>
              {/* <p>{product.pDescription}</p> */}
              <p>Price: ${product.pPrice}</p>
              <img src={product.pImages[0]} alt={product.pName} />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
