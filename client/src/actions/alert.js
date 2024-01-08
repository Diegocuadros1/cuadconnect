//dispatching case that we put into the reducer
import { SET_ALERT, REMOVE_ALERT } from './types';

//getting random id
import { v4 as uuid} from 'uuid';

//dispatch: thunk middleware
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  //creating a random id
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { 
      id, 
      msg, 
      alertType 
    }
  });

  setTimeout(() => dispatch(
    {
      type: REMOVE_ALERT, 
      payload: id 
    }), timeout); //5000 = 5 seconds
}