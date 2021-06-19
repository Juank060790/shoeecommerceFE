import axios from "axios";
// import store from "../store";
// import { alertActions } from "../redux/actions/alertActions";

const api = axios.create({
  baseURL: "https://shoecommerce.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (response) => {
    console.log("Starting Request 1", response);
    return response;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    // store.dispatch(alertActions.setAlert(error.message, "danger"));
    return Promise.reject(error);
  }
);

export default api;
