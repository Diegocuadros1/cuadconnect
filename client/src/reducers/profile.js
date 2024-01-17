import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "../actions/types";

const initialState = {
  profile: null, //Your own profile
  profiles: [], //profile listing page (list of developers)
  repos: [], //fetching github repos
  loading: true, //if content is still loading (when a reducer is called loading will then be false)
  error: {}, //sending the error
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    //getting all of the profiles on the database
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    //geting the github repos reducer
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        leading: false,
      };
    default:
      return state;
  }
}
