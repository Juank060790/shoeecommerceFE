import React, { useEffect, useState } from "react";
import Product from "../Components/Product";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/ProductsActions";
import { ImageTest } from "./ImageTest";
import SubMenu from "../Components/SubMenu";
import PaginationItem from "../Components/Pagination";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(listProducts(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <>
      <div className="header-flex-style">
        <div className="header-container">
          <div className="text-center header">
            <h1 className="headet-title">Shoe Ecommerce</h1>
            <p className="header-subtitle">
              This project is just a demo of an e-shop using MERN stack and
              other libraries, and a sneakers API.
            </p>
          </div>
          <div>
            <ImageTest />
          </div>
        </div>{" "}
      </div>
      <div>
        <div className="text-center">
          <SubMenu />
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="shoesList row center">
            {products.data.results.map((product) => (
              <Product key={product.id} product={product}></Product>
            ))}
          </div>
        )}
        <div className="bg-black">
          <PaginationItem
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pages={pages}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}
