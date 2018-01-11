import {FB_LOGIN, FB_STATUS} from '../actions/types';

const INITIAL_STATE = '';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FB_STATUS:
      return `${action.payload}_${Date.now()}`;
    case FB_LOGIN:
      return `success_${Date.now()}`;
    default:
      return state;
  }
}