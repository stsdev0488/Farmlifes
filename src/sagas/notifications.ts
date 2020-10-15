import {call, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {
  getNotificationsSuccess,
  getNotificationsFailed,
  getSinglePostSuccess,
  getSinglePostFailed,
  likeSinglePostSuccess,
  likeSinglePostFailed,
  unlikeSinglePostSuccess,
  unlikeSinglePostFailed,
  addCommentToSinglePostSuccess,
  addCommentToSinglePostFailed,
  getSinglePostLikesSuccess,
  getSinglePostLikesFailed,
  getSinglePostCommentsSuccess,
  getSinglePostCommentsFailed,
  getSinglePostSharesSuccess,
  getSinglePostSharesFailed,
} from '../actions/notifications';
import {
  getNotifications as apiGetNotifications,
  getSinglePost as apiGetSinglePost,
  likePost as apiLikePost,
  unLikePost as apiUnLikePost,
  commentOnAPost as apiCommentOnPost,
  getCommentsBelongingToAPost as apiGetCommentsBelongingToAPost,
  getLikesBelongingToAPost as apiGetLikesBelongingToAPost,
  getSharesBelongingToAPost as apiGetSharesBelongingToAPost,
} from '_services/api';

export function* getNotifications(action) {
  const {
    success,
    failure,
  } = action;

  try {
    const { data } = yield call(apiGetNotifications, null);

    yield put(getNotificationsSuccess(data.data));
    success && success();
  } catch (error) {
    yield put(getNotificationsFailed(error));
    failure && failure();
  }
}

export function* getSinglePost(action) {
  const {
    postId,
    success,
    failure,
  } = action;

  try {
    const { data } = yield call(apiGetSinglePost, postId);

    yield put(getSinglePostSuccess(data.data[0]));
    success && success();
  } catch (error) {
    yield put(getSinglePostFailed(error));
    failure && failure();
  }
}

export function* likeSinglePost(action) {
  try {
    const { data } = yield call(apiLikePost, action.post);
    yield put(likeSinglePostSuccess(data));
  } catch (error) {
    yield put(likeSinglePostFailed(error));

    showMessage({
      message: 'An error occured',
      description: "Post couldn't be liked",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* unlikeSinglePost(action) {
  try {
    const { data } = yield call(apiUnLikePost, action.post);
    yield put(unlikeSinglePostSuccess(data));
  } catch (error) {
    yield put(unlikeSinglePostFailed(error));

    showMessage({
      message: 'An error occured',
      description: "Post couldn't be unliked",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* addCommentToSinglePost(action) {
  try {
    const { data } = yield call(apiCommentOnPost, action.comment);
    yield put(addCommentToSinglePostSuccess(data.created));
  } catch (error) {
    yield put(addCommentToSinglePostFailed(error));
  }
}

export function* getSinglePostLikes(action) {
  try {
    const { data } = yield call(apiGetLikesBelongingToAPost, action.postId);
    yield put(getSinglePostLikesSuccess(data.data));
  } catch (error) {
    yield put(getSinglePostLikesFailed(error));
  }
}

export function* getSinglePostComments(action) {
  try {
    const { data } = yield call(apiGetCommentsBelongingToAPost, action.postId);
    yield put(getSinglePostCommentsSuccess(data.data));
  } catch (error) {
    yield put(getSinglePostCommentsFailed(error));
  }
}

export function* getSinglePostShares(action) {
  try {
    const { data } = yield call(apiGetSharesBelongingToAPost, action.postId);
    yield put(getSinglePostSharesSuccess(data.data));
  } catch (error) {
    yield put(getSinglePostSharesFailed(error));
  }
}
