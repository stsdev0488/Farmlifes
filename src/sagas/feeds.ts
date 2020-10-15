import {call, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import * as types from '../actions/types';
import {
  getFeeds as apiGetFeeds,
  likePost as apiLikePost,
  unLikePost as apiUnLikePost,
  commentOnAPost as apiCommentOnPost,
  getCommentsBelongingToAPost as apiGetCommentsBelongingToAPost,
  getLikesBelongingToAPost as apiGetLikesBelongingToAPost,
  getSharesBelongingToAPost as apiGetSharesBelongingToAPost,
  createPost as apiCreatePost,
  sharePost as apiSharePost,
  deletePost as apiDeletePost,
  default as api,
} from '../services/api';
import navigationService from '../services/navigationService';
import {DELETE_POST_FAILURE, DELETE_POST_SUCCESS} from '../actions/types';
import {strings} from '../utils/i18n';

export function* getFeeds(action: any) {
  try {
    const keyword = action.data.keyword ? action.data.keyword : null;
    if (action.data.page > 1 || action.data.reload) {
      yield put({type: types.SET_LOAD_MORE_START, loading: true});
    }
    const response = yield call(
      apiGetFeeds,
      action.data.page,
      action.data.type,
      keyword,
      action.data.userId,
      action.data.feedType,
      action.data.farmId,
    );

    // Was the operation successful?
    if (response.status === 200) {
      yield put({
        feedType: action.data.type,
        type: types.SET_FEEDS,
        feeds: response.data.data,
        page: action.page,
        endLoadMore: response.data.data.length === 0 ? true : false,
      });
    } else {
      yield put({type: types.GET_FEEDS_FAILED});
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't get post at the moment",
      type: 'danger',
      hideOnPress: true,
    });
    yield put({type: types.GET_FEEDS_FAILED});
  }
}

export function* likePost(action) {
  yield put({type: types.POST_LIKED, postId: action.post.id});
  try {
    const response = yield call(apiLikePost, action.post);
    if (response.status !== 200) {
      showMessage({
        message: 'An error occured',
        description: "Post couldn't be liked",
        type: 'danger',
        hideOnPress: true,
      });
      yield put({type: types.POST_UNLIKED, postId: action.post.id});
    }
  } catch (e) {
    showMessage({
      message: err.message,
      description: "Post couldn't be liked",
      type: 'danger',
      hideOnPress: true,
    });
    yield put({type: types.POST_UNLIKED, postId: action.post.id});
  }
}

export function* unLikePost(action) {
  yield put({type: types.POST_UNLIKED, postId: action.post.id});
  try {
    const response = yield call(apiUnLikePost, action.post);

    // Was the operation successful?
    if (response.status !== 204) {
      showMessage({
        message: 'An error occured',
        description: "Post couldn't be unliked",
        type: 'danger',
        hideOnPress: true,
      });
      yield put({type: types.POST_LIKED, postId: action.post.id});
    }
  } catch (e) {
    showMessage({
      message: err.message,
      description: "Post couldn't be unliked",
      type: 'danger',
      hideOnPress: true,
    });
    yield put({type: types.POST_LIKED, postId: action.post.id});
  }
}

export function* getLikesBelongingToPost(action) {
  try {
    const response = yield call(apiGetLikesBelongingToAPost, action.postId);
    if (response.status === 200) {
      yield put({
        type: types.ADD_LIKES_TO_POST,
        postId: action.postId,
        data: response.data.data,
      });
    }
  } catch (err) {
    showMessage({
      // autoHide: false,
      message: err.message,
      description: 'Liking of Post failed',
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* getCommentsBelongingToPost(action) {
  try {
    const response = yield call(apiGetCommentsBelongingToAPost, action.postId);
    if (response.status === 200) {
      yield put({
        type: types.ADD_COMMENTS_TO_POST,
        postId: action.postId,
        data: response.data.data,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}

export function* getSharesBelongingToPost(action) {
  try {
    const response = yield call(apiGetSharesBelongingToAPost, action.postId);
    if (response.status === 200) {
      yield put({
        type: types.ADD_SHARES_TO_POST,
        postId: action.postId,
        data: response.data.data,
      });
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Operation failed !",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* commentOnAPost(action) {
  yield put({
    type: types.ADD_MORE_COMMENTS_TO_POST,
    postId: action.commentData.id,
    data: action.commentObj,
  });

  try {
    const response = yield call(apiCommentOnPost, action.commentData);

    if (response.status !== 201) {
      yield put({
        type: types.REMOVE_COMMENT_FROM_POST,
        postId: action.commentData.id,
        commentId: action.commentObj,
      });
      showMessage({
        // autoHide: false,
        message: err.message,
        description: "Comment couldn't be added",
        type: 'danger',
        hideOnPress: true,
      });
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Comment couldn't be added",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* createNewPost(action) {
  try {
    const response = yield call(apiCreatePost, action.post);

    if (response.data.message === 'ok') {
      yield put({
        type: types.ADD_NEW_POST,
        post: response.data.created,
      });
      showMessage({
        message: 'Successful',
        description: 'Post created successfully',
        type: 'success',
        hideOnPress: true,
      });
      return navigationService.navigate('Feeds');
    }
    yield put({type: types.ADD_NEW_POST_FAILED});
  } catch (err) {
    yield put({type: types.ADD_NEW_POST_FAILED});
    showMessage({
      // autoHide: false,
      message: err.message,
      description: 'Creating of Post failed',
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* deletePost(action) {
  try {
    const response = yield call(apiDeletePost, action.postId);
    console.info('remove post response', response);
    if (response.status === 204) {
      yield put({
        type: DELETE_POST_SUCCESS,
        postId: action.postId,
      });

      if (action.onSuccess) {
        action.onSuccess(action.postId);
      }

      showMessage({
        message: strings('Common.success'),
        description: strings('Post.postDeleted'),
        type: 'success',
        hideOnPress: true,
      });
    } else {
      throw response;
    }
  } catch (e) {
    yield put({
      type: DELETE_POST_FAILURE,
      postId: action.postId,
    });
    showMessage({
      message: strings('Common.error'),
      description: e.message,
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* sharePost(action) {
  try {
    const response = yield call(apiSharePost, action.post);
    if (response.data.message === 'OK') {
      yield put({
        type: types.ADD_NEW_POST,
        post: response.data.created,
        oldPostID: action.post.id,
      });
      showMessage({
        message: 'Successful',
        description: 'Post shared successfully',
        type: 'success',
        hideOnPress: true,
      });
      return navigationService.navigate('Feeds');
    }
    yield put({type: types.ADD_NEW_POST_FAILED});
  } catch (err) {
    yield put({type: types.ADD_NEW_POST_FAILED});
    showMessage({
      // autoHide: false,
      message: err.message,
      description: "Post couldn't be shared",
      type: 'danger',
      hideOnPress: true,
    });
  }
}
