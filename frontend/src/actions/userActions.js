import axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from "../constants/userConstants";

export const userSignIn = (userEmail, userPassword) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
  });

  try {
    const { data } = await axios.post("/api/users/signIn", {
      email: userEmail,
      password: userPassword,
    });

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("loggedInUser", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userSignOut = () => (dispatch) => {
  localStorage.removeItem("loggedInUser");

  dispatch({
    type: USER_SIGNOUT,
  });
};

export const newUserSignUp =
  (newUserEmail, newUserPassword) => async (dispatch) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });

    try {
      const { data } = await axios.post("/api/users/signUp", {
        email: newUserEmail,
        password: newUserPassword,
      });

      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
