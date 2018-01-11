import {FB_LOGIN} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FB_LOGIN:
      return action.payload;
    default:
      return state;
  }
}