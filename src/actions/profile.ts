import {
  FOLLOW_USER,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
  GET_CONVERSATION_BETWEEN_USERS,
  GET_PROFILE_USER,
  SET_CONVERSATION_BETWEEN_USERS,
  SET_PROFILE_USER,
} from './types';

export const getProfileUser = (userId: number): any => ({
  type: GET_PROFILE_USER,
  userId,
});

export const setProfileUser = (user: any): any => ({
  type: SET_PROFILE_USER,
  user,
});

export const getConversationBetweenUsers = (userId1, userId2, onSuccess) => ({
  type: GET_CONVERSATION_BETWEEN_USERS,
  userId1,
  userId2,
  onSuccess,
});

export const setConversationBetweenUsers = conversation => ({
  type: SET_CONVERSATION_BETWEEN_USERS,
  conversation,
});

export const followUser = userId => ({
  type: FOLLOW_USER,
  userId,
});

export const followUserSuccess = userId => ({
  type: FOLLOW_USER_SUCCESS,
  userId,
});

export const followUserFailure = userId => ({
  type: FOLLOW_USER_FAILURE,
  userId,
});

export const unfollowUser = userId => ({
  type: UNFOLLOW_USER,
  userId,
});

export const unfollowUserSuccess = userId => ({
  type: UNFOLLOW_USER_SUCCESS,
  userId,
});

export const unfollowUserFailure = userId => ({
  type: UNFOLLOW_USER_FAILURE,
  userId,
});
