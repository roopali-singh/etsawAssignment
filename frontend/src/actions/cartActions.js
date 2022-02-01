import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_USER_ADDRESS,
  CART_ORDER_TOTAL_PRICE,
  EMPTY_CART,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/${productId}`
  );
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: data?.title,
      price: data?.price,
      image: data?.image,
      category: data?.category,
      product_id: data?.id,
      qty: qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress =
  (userShippingAddress) => (dispatch, getState) => {
    dispatch({
      type: CART_SAVE_USER_ADDRESS,
      payload: userShippingAddress,
    });

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(getState().cart.shippingAddress)
    );
  };

export const cartOrderTotal = (orderTotal) => (dispatch) => {
  dispatch({
    type: CART_ORDER_TOTAL_PRICE,
    payload: orderTotal,
  });
};

export const emptyCart = () => (dispatch, getState) => {
  dispatch({
    type: EMPTY_CART,
  });

  localStorage.removeItem("cartItems");
};
