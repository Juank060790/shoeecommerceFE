import React, { useEffect } from "react";
import Product from "../Components/Product";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/ProductsActions";
import { ImageTest } from "./ImageTest";
import SubMenu from "../Components/SubMenu";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <div className="header-container">
        <div className="text-center header">
          <h1 className="headet-title">Shoe Ecommerce</h1>
          <p className="header-subtitle">
            This project is just a demo of an eccomerce using MERN stack and
            other libraries
          </p>
        </div>
        <div>
          <ImageTest />
        </div>
      </div>{" "}
      <div className="text-center">
        <SubMenu />
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="shoesList row center">
            {products.results.map((product) => (
              <Product key={product.id} product={product}></Product>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
