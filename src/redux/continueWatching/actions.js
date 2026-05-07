export const ADD_OR_UPDATE_RECENTLY_WATCHED = "ADD_OR_UPDATE_RECENTLY_WATCHED";
export const REMOVE_RECENTLY_WATCHED = "REMOVE_RECENTLY_WATCHED";
export const CLEAR_RECENTLY_WATCHED = "CLEAR_RECENTLY_WATCHED";

export const addOrUpdateRecentlyWatched = (item) => ({
  type: ADD_OR_UPDATE_RECENTLY_WATCHED,
  payload: item,
});

export const removeRecentlyWatched = (itemId) => ({
  type: REMOVE_RECENTLY_WATCHED,
  payload: itemId,
});

export const clearRecentlyWatched = () => ({
  type: CLEAR_RECENTLY_WATCHED,
});