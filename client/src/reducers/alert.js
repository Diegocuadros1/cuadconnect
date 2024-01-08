//Centralized file of all action types
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

//Function that takes in a state that has to do with alert and an action
//an action will be dispatched into an actions file

const initialState = []
  //--ex of what one of these alerts will be
  // {
  //   id: 1,
  //   msg: 'Please log in',
  //   alertType: 'success'
  // }

export default function(state = initialState, action) {
  //NOTE: action contains two things: type(mandatory) & data
  switch(action.type) {
    case SET_ALERT:
      return [...state, action.payload]; //payload will have .id, .msg, and .alert ^^

    case REMOVE_ALERT:
      //return the state(array) and filter through the alerts 
      //(return any alert where the alert id doesnt = payload)
      return state.filter(alert => alert.id !== action.payload)

    default:
      return state;
  }
}
