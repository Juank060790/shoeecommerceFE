import Axios from "axios";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/Constants";

export const listProducts = (pageNumber = 1) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
    payload: pageNumber,
  });
  try {
    const { data } = await Axios.get(
      `https://api.thesneakerdatabase.com/v1/sneakers?limit=20&page=${pageNumber}`
    );
    const pages = Math.floor(data.count / 20);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: { data, pages } });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(
      `https://api.thesneakerdatabase.com/v1/sneakers/${productId}`
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.results[0] });
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
