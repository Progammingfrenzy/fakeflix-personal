import { all, call } from 'redux-saga/effects';
import { authSagas } from "./auth/auth.sagas";
import { continueWatchingSagas } from './continueWatching/continueWatching.sagas';

export function* rootSaga() {
	yield all([
		call(authSagas),
		call(continueWatchingSagas),
	])
}