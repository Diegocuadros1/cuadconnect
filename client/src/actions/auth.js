import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
  //check to see if there is a token
  if (localStorage.token) {
    //setting token to either existing or non existing
    setAuthToken(localStorage.token);
  }

  try {
    //calling server for getting
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};

//Login User
export const login = (email, password) => async (dispatch) => {
  //setting header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //turns the json email and pw into a string
  const body = JSON.stringify({ email, password });

  try {
    //calling server side POST /api/users
    const res = await axios.post("/api/auth", body, config);

    //If everything goes correctly
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    //calling any errors made on the server side
    const errors = err.response.data.errors;

    //if there are errors, call it with this error message as an alert
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    //Then show what happened on another dispatch
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Registering User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      //calling server side POST /api/users
      const res = await axios.post("/api/users", body, config);

      //If everything goes correctly dispatch the success and output data
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      //calling any errors made on the server side
      const errors = err.response.data.errors;

      //if there are errors, call it with this error message as an alert
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      //Then show what happened on another dispatch
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
