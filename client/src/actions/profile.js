import axios from "axios";
import { setAlert } from "./alert";
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";

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

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  //stop the flashing of the past users profile
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

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

// Getting github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    //Setting the header of the inputs
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //sending info to
    const res = await axios.put("/api/profile/experience", formData, config);

    //getting the users profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    //if edited is true, then say profile updated, else say profile created
    dispatch(setAlert("Experience Added", "success"));

    //You can't <Navigate> in an action, must use /__
    navigate("/dashboard");
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

//Add Project
export const addProject = (formData, navigate) => async (dispatch) => {
  try {
    //Setting the header of the inputs
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //sending info to
    const res = await axios.put("/api/profile/projects", formData, config);

    //getting the users profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    //if edited is true, then say profile updated, else say profile created
    dispatch(setAlert("Project Added", "success"));

    //You can't <Navigate> in an action, must use /__
    navigate("/dashboard");
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
        navigate("/dashboard");
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

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Project
export const deleteProject = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/projects/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Project Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
