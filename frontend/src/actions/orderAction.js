import axios from "axios";
import { EMPTY_CART } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

export const createOrder =
  (order, orderTotal) => async (dispatch, getState) => {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const loggedInUser = getState().user.loggedInUser;
    // const {
    //   userSignIn: { loggedInUser },
    // } = getState();
    try {
      const { data } = await axios.post(
        "/api/orders/createOrder",
        { order, orderTotal },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser?.token}`,
          },
        }
      );

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: EMPTY_CART,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const resetOrderCreated = () => (dispatch) => {
//   dispatch({
//     type: ORDER_CREATE_RESET,
//   });
// };

export const fetchOrderDetails = (orderId) => async (dispatch) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
  });

  try {
    const { data } = await axios.post(`/orderDetails/${orderId}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
