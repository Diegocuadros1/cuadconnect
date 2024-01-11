import axios from "axios";
import { setAlert } from "./alert";
import { useNavigate } from "react-router-dom";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create / update a profile
export const createProfile =
  (
    formData,
    navigate, //navigating the user
    edit = false //formData is what is inputed,
  ) =>
  async (dispatch) => {
    try {
      //Setting the header of the inputs
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //sending info to
      const res = await axios.post("/api/profile", formData, config);

      //getting the users profile
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      //if edited is true, then say profile updated, else say profile created
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      //if you this is the first time you are updating your profile
      if (!edit) {
        //You can't <Navigate> in an action, must use /__
        console.log("not working");
        useNavigate("/dashboard");
      }
    } catch (err) {
      //if there are server side errors:
      const errors = err.response.data.errors;

      //show any error inputed
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      //dipatching the error
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
