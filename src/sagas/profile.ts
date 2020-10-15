import {call, put} from 'redux-saga/effects';
import * as types from '../actions/types';

import { showMessage } from 'react-native-flash-message';

import { getUser, follow, unfollow } from "../services/api";
import {
  followUserFailure,
  followUserSuccess,
  unfollowUserFailure,
  unfollowUserSuccess,
} from '../actions/profile';

export function* getProfileUser(action: {userId: number}) {
  try {
    const response = yield call(getUser, action.userId);

    if (response.status === 200 && response.data) {
      console.info('putting', {type: types.SET_PROFILE_USER, user: response.data});
      yield put({type: types.SET_PROFILE_USER, user: response.data});
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't find user",
      type: 'danger',
      hideOnPress: true,
    });
  }
};

export function* followSaga(action) {
  console.info('follow saga', action);
  try {
    const response = yield call(follow, {'target_type': 'user', 'target_id': action.userId});
    console.info('follow response', response);

    if (response && response.data) {
      // Update the user
      yield call(getUser, action.userId);
      yield put(followUserSuccess(action.userId));
    } else {
      showMessage({
        message: 'Error',
        description: 'Couldn\'t follow user',
        type: 'danger',
        hideOnPress: true,
      });

      yield put(followUserFailure(action.userId));
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't follow user",
      type: 'danger',
      hideOnPress: true,
    });

    yield put(followUserFailure(action.userId));
  }
}

export function* unfollowSaga(action) {
  console.info('unfollow saga', action);
  try {
    const response = yield call(unfollow, {'target_type': 'user', 'target_id': action.userId});
    console.info('unfollow response', response);

    if (response && response.data) {
      // Update the user
      yield call(getUser, action.userId);
      yield put(unfollowUserSuccess(action.userId));
    } else {
      showMessage({
        message: 'Error',
        description: 'Couldn\'t unfollow user',
        type: 'danger',
        hideOnPress: true,
      });

      yield put(unfollowUserFailure(action.userId));
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't unfollow user",
      type: 'danger',
      hideOnPress: true,
    });

    yield put(unfollowUserFailure(action.userId));
  }
}
