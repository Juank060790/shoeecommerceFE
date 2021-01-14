import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  const rating = Math.floor(Math.random() * 5 + 1);
  const numReviews = Math.floor(Math.random() * 200 + 1);

  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product.id}`}>
        <img
          className="medium shoesImage"
          src={product.media.imageUrl}
          alt={product.name}
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={rating} numReviews={numReviews}></Rating>
        <div className="price">${product.retailPrice}</div>
      </div>
    </div>
  );
}
