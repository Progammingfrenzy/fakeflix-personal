export const selectContinueWatching = (state) => state.continueWatching;

export const selectRecentlyWatched = (state) =>
  state?.continueWatching?.recentlyWatched || [];