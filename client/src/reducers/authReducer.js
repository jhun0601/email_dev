import { FETCH_USER } from '../actions/types';
export default function(state = null , action) {
  console.log(action);
  switch(action.type) {
    case FETCH_USER:
              //user model action payload
      return action.payload || false;
    default:
      return state;
  }
}
