import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import Axios from "axios";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  var options = {
    method: "GET",
    url: `https://v1-sneakers.p.rapidapi.com/v1/sneakers/${productId}`,
    headers: {
      "x-rapidapi-key": "d69a820839msh6e20908572e3ca7p114797jsn7f765f568098",
      "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    },
  };

  await Axios.request(options).then(function (data) {
    console.log(`data`, data);
    const addItem = data.data.results[0];
    // console.log("ADD to cartv ---->", addItem.countInStock);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: addItem.name,
        image: addItem.media.imageUrl,
        price: addItem.retailPrice,
        countInStock: 10,
        product: addItem.id,
        qty,
      },
    });
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
