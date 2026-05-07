import { continueWatchingActionTypes as types } from './continueWatching.types';

export const addRecentlyWatched = item => ({
  type: types.ADD_RECENTLY_WATCHED,
  payload: item,
});

export const addRecentlyWatchedSuccess = list => ({
  type: types.ADD_RECENTLY_WATCHED_SUCCESS,
  payload: list,
});

export const addRecentlyWatchedFailure = error => ({
  type: types.ADD_RECENTLY_WATCHED_FAILURE,
  payload: error,
});

export const setRecentlyWatched = list => ({
  type: types.SET_RECENTLY_WATCHED,
  payload: list,
});
