import { continueWatchingActionTypes as types } from './continueWatching.types';

const MAX_RECENT = 20;

const INITIAL_STATE = {
  list: []
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case types.ADD_RECENTLY_WATCHED: {
      const item = action.payload;
      if (!item || !item.id) return state;

      // remove existing with same id
      const filtered = state.list.filter(i => i.id !== item.id);

      const timestamped = { ...item, timestamp: item.timestamp || Date.now() };
      const newList = [timestamped, ...filtered].slice(0, MAX_RECENT);

      return { ...state, list: newList };
    }
    case types.SET_RECENTLY_WATCHED: {
      const list = Array.isArray(action.payload) ? action.payload : [];
      return { ...state, list: list.slice(0, MAX_RECENT) };
    }
    default:
      return state;
  }
};

export default reducer;
