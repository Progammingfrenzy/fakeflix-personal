import reducer from './continueWatching.reducer';
import { addRecentlyWatched, setRecentlyWatched } from './continueWatching.actions';

describe('continueWatching reducer', () => {
  const makeItem = (id, title = 'Title') => ({
    id,
    title,
    poster_path: `/poster_${id}.jpg`,
    backdrop_path: `/back_${id}.jpg`,
    media_type: 'movie',
  });

  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({ list: [] });
  });

  it('should add a new item to the front of the list', () => {
    const item1 = makeItem(1);
    const item2 = makeItem(2);

    let state = reducer(undefined, addRecentlyWatched(item1));
    expect(state.list[0]).toEqual(expect.objectContaining({ id: 1 }));

    state = reducer(state, addRecentlyWatched(item2));
    expect(state.list[0]).toEqual(expect.objectContaining({ id: 2 }));
    expect(state.list[1]).toEqual(expect.objectContaining({ id: 1 }));
  });

  it('should deduplicate an existing item and move it to front', () => {
    const item1 = makeItem(1);
    const item2 = makeItem(2);

    let state = reducer(undefined, addRecentlyWatched(item1));
    state = reducer(state, addRecentlyWatched(item2));
    // add item1 again
    state = reducer(state, addRecentlyWatched(item1));

    expect(state.list[0].id).toBe(1);
    expect(state.list.length).toBe(2);
  });

  it('should limit list to MAX_RECENT (20) when adding many items', () => {
    const items = Array.from({ length: 25 }, (_, i) => makeItem(i + 1));
    let state = reducer(undefined, {});
    items.forEach(it => {
      state = reducer(state, addRecentlyWatched(it));
    });
    expect(state.list.length).toBeLessThanOrEqual(20);
    expect(state.list[0].id).toBe(25);
    expect(state.list[state.list.length - 1].id).toBeGreaterThanOrEqual(6);
  });

  it('should replace list when setRecentlyWatched is dispatched', () => {
    const items = [makeItem(1), makeItem(2)];
    const state = reducer(undefined, setRecentlyWatched(items));
    expect(state.list).toHaveLength(2);
    expect(state.list[0].id).toBe(1);
  });
});
