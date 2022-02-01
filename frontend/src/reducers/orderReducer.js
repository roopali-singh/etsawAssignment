import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

export const orderReducer = (
  state = {
    loading: false,
    success: false,
    createdOrder: null,
    orderDetails: null,
  },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        createdOrder: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ORDER_CREATE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        createdOrder: null,
      };

    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
