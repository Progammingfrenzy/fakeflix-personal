import { ADD_RECENTLY_WATCHED } from "./continueWatching.actions";

const INITIAL_STATE = {
  list: [],
};

const continueWatchingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RECENTLY_WATCHED: {
      console.log("Reducer got watched item:", action.payload);

      const filteredList = state.list.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        list: [action.payload, ...filteredList],
      };
    }

    default:
      return state;
  }
};

export default continueWatchingReducer;