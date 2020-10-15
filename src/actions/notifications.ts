import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED,
  GET_SINGLE_POST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILED,
  LIKE_SINGLE_POST,
  LIKE_SINGLE_POST_SUCCESS,
  LIKE_SINGLE_POST_FAILED,
  UNLIKE_SINGLE_POST,
  UNLIKE_SINGLE_POST_SUCCESS,
  UNLIKE_SINGLE_POST_FAILED,
  ADD_COMMENT_TO_SINGLE_POST,
  ADD_COMMENT_TO_SINGLE_POST_SUCCESS,
  ADD_COMMENT_TO_SINGLE_POST_FAILED,
  GET_SINGLE_POST_LIKES,
  GET_SINGLE_POST_LIKES_SUCCESS,
  GET_SINGLE_POST_LIKES_FAILED,
  GET_SINGLE_POST_COMMENTS,
  GET_SINGLE_POST_COMMENTS_SUCCESS,
  GET_SINGLE_POST_COMMENTS_FAILED,
  GET_SINGLE_POST_SHARES,
  GET_SINGLE_POST_SHARES_SUCCESS,
  GET_SINGLE_POST_SHARES_FAILED,
} from './types';

export const getNotifications = ({ success, failure }) => ({
  type: GET_NOTIFICATIONS,
  success,
  failure,
});

export const getNotificationsSuccess = (data) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  data,
});

export const getNotificationsFailed = (error) => ({
  type: GET_NOTIFICATIONS_FAILED,
  error,
});

export const getSinglePost = ({ postId, success, failure }) => ({
  type: GET_SINGLE_POST,
  postId,
  success,
  failure,
});

export const getSinglePostSuccess = (data) => ({
  type: GET_SINGLE_POST_SUCCESS,
  data,
});

export const getSinglePostFailed = (error) => ({
  type: GET_SINGLE_POST_FAILED,
  error,
});

export const likeSinglePost = (post) => ({
  type: LIKE_SINGLE_POST,
  post,
});

export const likeSinglePostSuccess = (data) => ({
  type: LIKE_SINGLE_POST_SUCCESS,
  data,
});

export const likeSinglePostFailed = (error) => ({
  type: LIKE_SINGLE_POST_FAILED,
  error,
});

export const unlikeSinglePost = (post) => ({
  type: UNLIKE_SINGLE_POST,
  post,
});

export const unlikeSinglePostSuccess = (data) => ({
  type: UNLIKE_SINGLE_POST_SUCCESS,
  data,
});

export const unlikeSinglePostFailed = (error) => ({
  type: UNLIKE_SINGLE_POST_FAILED,
  error,
});

export const addCommentToSinglePost = (comment) => ({
  type: ADD_COMMENT_TO_SINGLE_POST,
  comment,
});

export const addCommentToSinglePostSuccess = (data) => ({
  type: ADD_COMMENT_TO_SINGLE_POST_SUCCESS,
  data,
});

export const addCommentToSinglePostFailed = (error) => ({
  type: ADD_COMMENT_TO_SINGLE_POST_FAILED,
  error,
});

export const getSinglePostLikes = (postId) => ({
  type: GET_SINGLE_POST_LIKES,
  postId,
});

export const getSinglePostLikesSuccess = (data) => ({
  type: GET_SINGLE_POST_LIKES_SUCCESS,
  data,
});

export const getSinglePostLikesFailed = (error) => ({
  type: GET_SINGLE_POST_LIKES_FAILED,
  error,
});

export const getSinglePostComments = (postId) => ({
  type: GET_SINGLE_POST_COMMENTS,
  postId,
});

export const getSinglePostCommentsSuccess = (data) => ({
  type: GET_SINGLE_POST_COMMENTS_SUCCESS,
  data,
});

export const getSinglePostCommentsFailed = (error) => ({
  type: GET_SINGLE_POST_COMMENTS_FAILED,
  error,
});

export const getSinglePostShares = (postId) => ({
  type: GET_SINGLE_POST_SHARES,
  postId,
});

export const getSinglePostSharesSuccess = (data) => ({
  type: GET_SINGLE_POST_SHARES_SUCCESS,
  data,
});

export const getSinglePostSharesFailed = (error) => ({
  type: GET_SINGLE_POST_SHARES_FAILED,
  error,
});
