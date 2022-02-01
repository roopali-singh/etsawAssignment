import {
  CART_ADD_ITEM,
  CART_ORDER_TOTAL_PRICE,
  CART_REMOVE_ITEM,
  CART_SAVE_USER_ADDRESS,
  EMPTY_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: null, orderTotal: 0 },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state?.cartItems?.find(
        (product) => product?.product_id === item?.product_id
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state?.cartItems?.map((product) =>
            product?.product_id === existItem?.product_id ? item : product
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state?.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      const itemId = action.payload;
      return {
        ...state,
        cartItems: state?.cartItems?.filter(
          (product) => product?.product_id !== itemId
        ),
      };

    case CART_SAVE_USER_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_ORDER_TOTAL_PRICE:
      return {
        ...state,
        orderTotal: action.payload,
      };

    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
