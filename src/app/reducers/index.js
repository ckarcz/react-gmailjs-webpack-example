import { combineReducers } from 'redux';

function emptyReducer(state) {
  if (state == null) return [];
  return state;
}

export default combineReducers({
  emptyReducer
});
