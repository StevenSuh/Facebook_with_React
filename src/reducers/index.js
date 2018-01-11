import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import LoginReducer from './reducer_login';
import StatusReducer from './reducer_status';

const rootReducer = combineReducers({
  user: LoginReducer,
  status: StatusReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

export default store;

