import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from "../constants/userConstants";

export const userReducer = (
  state = { loading: false, loggedInUser: null },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload,
      };

    case USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_SIGNOUT:
      return { ...state, loggedInUser: null };

    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload,
      };

    case USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
