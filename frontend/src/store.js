import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userReducer } from "./reducers/userReducer";
import { orderReducer } from "./reducers/orderReducer";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : null,
    orderTotal: 0,
  },
  user: {
    loggedInUser: localStorage.getItem("loggedInUser")
      ? JSON.parse(localStorage.getItem("loggedInUser"))
      : null,
  },
};

const reducer = combineReducers({
  productList: productReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
