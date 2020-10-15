import {
  GET_FEEDS,
  SET_FEEDS,
  LIKE_POST,
  UNLIKE_POST,
  ADD_COMMENT_TO_POST,
  GET_ALL_POST_LIKES,
  GET_ALL_POST_COMMENTS,
  GET_ALL_POST_SHARES,
  CREATE_NEW_POST,
  SHARE_POST,
  START_IMAGE_UPLOAD,
  ADD_NEW_POST_FAILED, DELETE_POST,
} from './types';

export const startUpload = () => ({
  type: START_IMAGE_UPLOAD,
});

export const getFeeds = (data) => ({
  type: GET_FEEDS,
  data,
});

export const setFeeds = feeds => ({
  type: SET_FEEDS,
  feeds,
});

export const likePost = post => ({
  type: LIKE_POST,
  post,
});

export const unLikePost = post => ({
  type: UNLIKE_POST,
  post,
});

export const addCommentToPost = (commentData, commentObj) => ({
  type: ADD_COMMENT_TO_POST,
  commentData,
  commentObj,
});

export const getPostLikes = postId => ({
  type: GET_ALL_POST_LIKES,
  postId,
});

export const getPostComments = postId => ({
  type: GET_ALL_POST_COMMENTS,
  postId,
});

export const getPostShares = postId => ({
  type: GET_ALL_POST_SHARES,
  postId,
});

export const createNewPost = post => ({
  type: CREATE_NEW_POST,
  post,
});

export const deletePost = (postId, onSuccess) => ({
  type: DELETE_POST,
  postId,
  onSuccess,
});

export const sharePost = post => ({
  type: SHARE_POST,
  post,
});

export const createNewPostFailed = () => ({
  type: ADD_NEW_POST_FAILED,
});
