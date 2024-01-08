import { 
  //Different cases that could happen
  REGISTER_SUCCESS, 
  REGISTER_FAIL,
  USER_LOADED, 
  AUTH_ERROR, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGOUT 
} from "../actions/types";

//
const initialState = {
  token: localStorage.getItem('token'), //getting token from localstorage
  isAuthenticated: null, //Authentication is by default null
  loading: true, // is currently not loaded | making sure you already made a request to the backend and get the response
  user: null
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  //when a user is loaded
  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //setting the token up and putting it into local storage
      localStorage.setItem('token', payload.token)
      return {
        ...state, 
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    
    //if there is any error
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated:false,
        loading: false
      }
    
    default:
      return state
  }
}