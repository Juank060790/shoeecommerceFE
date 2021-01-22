import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./redux/actions/userActions";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import SigninScreen from "./Screens/SigninScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PrivateRoute from "./Components/PrivateRoute";
import ProductList from "./Components/ProductList";
import { listProducts } from "./redux/actions/ProductsActions";
import PaginationItem from "./Components/Pagination";

// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productList = useSelector((state) => state.productList);
  const { loading, pages } = productList;

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(listProducts(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="menu-top row sticky">
          <div>
            <div>
              <Link className="brand" to="/">
                Shoe Shop DEMO
              </Link>
            </div>
            {pageNumber ? (
              <div className="Pagination">
                <PaginationItem
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  pages={pages}
                  loading={loading}
                />
              </div>
            ) : (
              <div> </div>
            )}

            <div>
              {" "}
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name}
                    <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="/profile">User</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              <Link to="/cart">
                Cart
                {cartItems.length > 0 && (
                  <span className="badge"> {cartItems.length}</span>
                )}
              </Link>
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>

                    <li>
                      <Link to="/productList">Products</Link>
                    </li>

                    <li>
                      <Link to="/orderList">Orders</Link>
                    </li>

                    <li>
                      <Link to="/userList">Users</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/productList" component={ProductList}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
