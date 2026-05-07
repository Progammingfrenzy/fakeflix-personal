import { takeEvery, put, call } from 'redux-saga/effects';
import { continueWatchingActionTypes as types } from './continueWatching.types';
import { setRecentlyWatched, addRecentlyWatchedFailure } from './continueWatching.actions';
import { auth, firestore, createUserProfileDocument } from '../../firebase/firebaseUtils';

function* persistRecentlyWatched({ payload: item }) {
  try {
    const user = auth.currentUser;
    // update local only if no user; if user exists, persist to Firestore
    if (!user) return;

    const uid = user.uid;
    const userRef = firestore.doc(`users/${uid}`);

    const newList = yield call(async () => {
      return firestore.runTransaction(async tx => {
        const doc = await tx.get(userRef);
        if (!doc.exists) {
          // create user doc first (follow app pattern)
          await createUserProfileDocument(user);
          // refetch
          const fresh = await tx.get(userRef);
          const existing = (fresh.data() && fresh.data().recentlyWatched) || [];
          const filtered = existing.filter(i => i.id !== item.id);
          const timestamped = { ...item, timestamp: Date.now() };
          const nl = [timestamped, ...filtered].slice(0, 20);
          tx.set(userRef, { ...fresh.data(), recentlyWatched: nl }, { merge: true });
          return nl;
        }

        const existing = (doc.data() && doc.data().recentlyWatched) || [];
        const filtered = existing.filter(i => i.id !== item.id);
        const timestamped = { ...item, timestamp: Date.now() };
        const nl = [timestamped, ...filtered].slice(0, 20);
        tx.update(userRef, { recentlyWatched: nl });
        return nl;
      });
    });

    // dispatch setRecentlyWatched to reconcile local state with server
    yield put(setRecentlyWatched(newList));
  } catch (e) {
    yield put(addRecentlyWatchedFailure(e.message || e.toString()));
  }
}

export function* watchAddRecentlyWatched() {
  yield takeEvery(types.ADD_RECENTLY_WATCHED, persistRecentlyWatched);
}

export function* continueWatchingSagas() {
  yield watchAddRecentlyWatched();
}
