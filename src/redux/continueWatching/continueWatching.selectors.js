export const selectContinueWatching = state => state.continueWatching;
export const selectRecentlyWatched = state => (state.continueWatching && state.continueWatching.list) || [];
