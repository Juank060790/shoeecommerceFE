import React, { useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Product(props) {
  const { product } = props;
  const rating = Math.floor(Math.random() * 5 + 1);
  const numReviews = Math.floor(Math.random() * 200 + 1);
  const productList = useSelector(
    (state) => state.productList.products.data.results
  );

  const Black = productList.indexOf(product);
  const [gridColor, setGridColor] = useState(false);

  // console.log("GRIDCOLOR", gridColor);

  const grid = () => {
    // console.log("PRODUCT LIST", Black);
    if (Black % 2 === 0) {
      // console.log("EVEN", gridColor);
      setGridColor(true);
    } else {
      // console.log("ODD", gridColor);
      setGridColor(false);
    }
  };

  return (
    <div
      key={product._id}
      onLoad={grid}
      className={`${gridColor ? "cardBlack " : "cardWhite"}`}
    >
      <Link to={`/product/${product.id}`}>
        <img
          className="medium shoesImage"
          src={product.media.imageUrl}
          alt={product.name}
        />
      </Link>
      <div className={`${gridColor ? "card-body linkCardBlack" : "card-body"}`}>
        <Link to={`/product/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={rating} numReviews={numReviews}></Rating>
        <div className="price">${product.retailPrice}</div>
      </div>
    </div>
  );
}
