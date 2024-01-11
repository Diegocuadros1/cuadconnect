import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
  profile: null, //Your own profile
  profiles: [], //profile listing page (list of developers)
  repos: [], //fetching github repos
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      console.log(payload);
      return {
        ...state,
        profile: payload,
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
