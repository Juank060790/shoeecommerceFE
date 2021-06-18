import Axios from "axios";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/Constants";

// const options = {
//   method: "GET",
//   url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
//   params: { limit: "20", page: 1 },
//   headers: {
//     "x-rapidapi-key": "d69a820839msh6e20908572e3ca7p114797jsn7f765f568098",
//     "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
//   },
// };

export const listProducts =
  (pageNumber = 1) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
      payload: pageNumber,
    });
    try {
      const options = {
        method: "GET",
        url: "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
        params: { limit: "20", page: `${pageNumber}` },
        headers: {
          "x-rapidapi-key":
            "d69a820839msh6e20908572e3ca7p114797jsn7f765f568098",
          "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
        },
      };
      await Axios.request(options).then(function (data) {
        const pages = Math.floor(data.data.count / 20);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: { data, pages } });
      });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    var options = {
      method: "GET",
      url: `https://v1-sneakers.p.rapidapi.com/v1/sneakers/${productId}`,
      headers: {
        "x-rapidapi-key": "d69a820839msh6e20908572e3ca7p114797jsn7f765f568098",
        "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
      },
    };

    await Axios.request(options).then(function (data) {
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.data?.results[0],
      });
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
