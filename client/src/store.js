//createStore has been improved to configureStore to fix certain bugs however for educational purposes I will continue with createStore instead 
import { legacy_createStore as createStore, applyMiddleware} from 'redux'; 

//from redux devtools
//import { composeWithDevTools } from 'redux-devtools-extension';

//middleware
import {thunk} from 'redux-thunk';

//combining reducers into a rootreducer
import rootReducer from './reducers';

const initialState = {};

//establishing middleware
const middleware = [thunk];

//creating the store
const store = createStore(
  rootReducer,
  initialState,
  //middleware
  //  composeWithDevTools(applyMiddleware(...middleware))
  applyMiddleware(...middleware)
);

export default store;

