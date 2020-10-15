import {all, call, put} from 'redux-saga/effects';
import * as types from '../actions/types';

import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  getSuggestion as apiGetSuggestion,
  follow as apiFollow,
  unfollow as apiUnfollow,
  getMyUser as apiGetMyUser,
  editMyUser,
  verifyEmail,
} from '_services/api';
import {
  EDIT_MY_USER_FAILURE,
  EDIT_MY_USER_SUCCESS,
  GET_MY_USER_FAILURE,
  GET_MY_USER_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS
} from '../actions/types';
import * as api from '../services/api';
import {reauthenticate} from '../actions/user';

export function* getSuggestionForUser(action) {
  try {
    if (action.page > 1) {
      yield put({
        type: types.SUGGESTION_LOAD_MORE,
      });
    } else {
      yield put({
        type: types.GET_SUGGESTION,
        reload: action.reload,
      });
    }

    const response = yield call(
      apiGetSuggestion,
      action.coordinates,
      action.page,
    );

    if (response.status === 200) {
      yield put({
        type: types.SET_USER_SUGGESTION,
        suggestions: response.data.data,
        endLoadMore: response.data.data.length === 0 ? true : false,
      });
    } else {
      showMessage({
        message: 'Failed',
        description: "Couldn't get suggestions",
        type: 'danger',
        hideOnPress: true,
      });
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't get suggestions",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* follow(action: {data: any}) {
  try {
    if (action.data.trigger) {
      yield put({
        type: types.SET_FOLLOW_USER_SUGGESTION,
        id: action.data.target_id,
      });
    }

    const response = yield call(apiFollow, action.data);
    if (response.status > 400 || response.status === undefined) {
      showMessage({
        message: 'Operation failed',
        description: "Couldn't follow user/farm",
        type: 'danger',
        hideOnPress: true,
      });

      if (action.data.trigger) {
        yield put({
          type: types.SET_UNFOLLOW_USER_SUGGESTION,
          id: action.data.target_id,
        });
      }
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't follow user/farm",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* unfollow(action: {data: any}) {
  yield put({
    type: types.SET_UNFOLLOW_USER_SUGGESTION,
    id: action.data.target_id,
  });
  try {
    const response = yield call(apiUnfollow, action.data);

    if (response.status > 400 || response.status === undefined) {
      showMessage({
        message: 'Operation failed',
        description: "Couldn't follow user/farm",
        type: 'danger',
        hideOnPress: true,
      });
      yield put({
        type: types.SET_UNFOLLOW_USER_SUGGESTION,
        id: action.data.target_id,
      });
    }
  } catch (e) {
    showMessage({
      message: e.message,
      description: "Couldn't unfollow user/farm",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* getMyUser() {
  try {
    const response = yield call(apiGetMyUser);
    if (response.data && response.data.data) {
      yield put({
        type: GET_MY_USER_SUCCESS,
        myUser: response.data.data,
      });
    } else {
      throw response;
    }
  } catch (e) {
    showMessage({
      message: e.message,
      type: 'danger',
      hideOnPress: true,
    });
    yield put({
      type: GET_MY_USER_FAILURE,
      error: e,
    });
  }
}

export function* editMyUserSaga(action) {
  try {
    let [avatar, cover] = yield all([
      call(api.uploadLocalImageToServer, action.user.avatar),
      call(api.uploadLocalImageToServer, action.user.cover),
    ]);

    const response = yield call(editMyUser, {
      ...action.user,
      avatar: avatar && avatar.data && avatar.data.token || '',
      cover: cover && cover.data && cover.data.token || '',
    });

    if (response.status === 200) {
      yield put({type: EDIT_MY_USER_SUCCESS});
      yield put(reauthenticate());
    } else {
      throw response;
    }
  } catch (e) {
    showMessage({
      message: e.message,
      type: 'danger',
      hideOnPress: true,
    });
    yield put({
      type: EDIT_MY_USER_FAILURE,
      error: e,
    });
  }
}

export function* verifyEmailSaga(action) {
  try {
    const response = yield call(verifyEmail, action.data);
    showMessage({
      message: 'Success',
      description: 'Verification email sent. Please check your email',
      type: 'success',
      hideOnPress: true,
    });
    yield put({type: VERIFY_EMAIL_SUCCESS});
  } catch (e) {
    showMessage({
      message: e.message,
      description: 'Error, please try again',
      type: 'danger',
      hideOnPress: true,
    });
    yield put({
      type: VERIFY_EMAIL_FAILURE,
      error: e
    });
  };
};
