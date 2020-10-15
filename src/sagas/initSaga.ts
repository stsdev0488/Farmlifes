import {takeLatest} from 'redux-saga/effects';

import * as types from '../actions/types';
import {login, register, reauthenticate, setDeviceInfo} from './auth';
import {
  getFeeds,
  likePost,
  unLikePost,
  commentOnAPost,
  getLikesBelongingToPost,
  getSharesBelongingToPost,
  getCommentsBelongingToPost,
  createNewPost,
  sharePost,
  deletePost,
} from './feeds';

import {
  getSuggestionForUser,
  follow,
  unfollow,
  getMyUser,
  editMyUserSaga,
  verifyEmailSaga,
} from './user';

import {
  sendUserMessage,
  getFarmConversations,
  getConversation,
  getAllConversations,
  getConversationBetweenUsers,
  getConversationMessages,
} from './messenger';
import {
  createOrEditFarm,
  getConversationWithFarmSaga,
  getFarm,
  getFarmCategories,
  subscribeToFarm,
  unsubscribeFromFarm,
  getFarmMembers,
  acceptFarmMembershipRequest,
  rejectFarmMembershipRequest,
  deleteFarmMember,
} from './farmProfile';
import {followSaga, getProfileUser, unfollowSaga} from './profile';

import {
  getNotifications,
  getSinglePost,
  likeSinglePost,
  unlikeSinglePost,
  addCommentToSinglePost,
  getSinglePostLikes,
  getSinglePostComments,
  getSinglePostShares,
} from './notifications';

import {
  searchUsers,
  searchFarms,
  requestFarmMembership,
  cancelFarmMembershipRequest,
} from './view';

function* initSaga() {
  /*
      SAGA EFFECTS:

      fork() -> do something once
      takeLatest() -> take latest action and cancel running saga, if exists
      takeEvery() -> for each action start a saga, even if already running
  */

  // Hook into actions
  yield takeLatest(types.LOGIN, login);
  yield takeLatest(types.REGISTER, register);
  yield takeLatest(types.SET_DEVICE_INFO, setDeviceInfo);
  yield takeLatest(types.REAUTHENTICATE, reauthenticate);
  yield takeLatest(types.GET_MY_USER, getMyUser);
  yield takeLatest(types.EDIT_MY_USER, editMyUserSaga);

  yield takeLatest(types.GET_FEEDS, getFeeds);
  yield takeLatest(types.LIKE_POST, likePost);
  yield takeLatest(types.UNLIKE_POST, unLikePost);
  yield takeLatest(types.ADD_COMMENT_TO_POST, commentOnAPost);

  yield takeLatest(types.GET_ALL_POST_LIKES, getLikesBelongingToPost);
  yield takeLatest(types.GET_ALL_POST_COMMENTS, getCommentsBelongingToPost);
  yield takeLatest(types.GET_ALL_POST_SHARES, getSharesBelongingToPost);

  yield takeLatest(types.CREATE_NEW_POST, createNewPost);
  yield takeLatest(types.DELETE_POST, deletePost);
  yield takeLatest(types.SHARE_POST, sharePost);

  yield takeLatest(types.GET_USER_SUGGESTION, getSuggestionForUser);

  yield takeLatest(types.FOLLOW_USER_SUGGESTION, follow);
  yield takeLatest(types.UNFOLLOW_USER_SUGGESTION, unfollow);
  yield takeLatest(types.VERIFY_EMAIL, verifyEmailSaga);

  /* Messenger */
  yield takeLatest(types.GET_CONVERSATION_MESSAGES, getConversationMessages);

  /* Profile */
  yield takeLatest(types.GET_PROFILE_USER, getProfileUser);
  yield takeLatest(types.FOLLOW_USER, followSaga);
  yield takeLatest(types.UNFOLLOW_USER, unfollowSaga);

  yield takeLatest(
    types.GET_CONVERSATION_BETWEEN_USERS,
    getConversationBetweenUsers,
  );

  yield takeLatest(types.GET_ALL_CONVERSATIONS, getAllConversations);
  yield takeLatest(types.GET_FARM_CONVERSATIONS, getFarmConversations);
  yield takeLatest(types.GET_CONVERSATION_BETWEEN_TWO_PEOPLE, getConversation);
  yield takeLatest(types.SEND_USER_MESSAGE, sendUserMessage);

  /* Farms */
  yield takeLatest(types.GET_FARM, getFarm);
  yield takeLatest(types.GET_FARM_CATEGORIES, getFarmCategories);
  yield takeLatest(types.CREATE_OR_EDIT_FARM, createOrEditFarm);
  yield takeLatest(
    types.GET_CONVERSATION_WITH_FARM,
    getConversationWithFarmSaga,
  );
  yield takeLatest(types.SUBSCRIBE_TO_FARM, subscribeToFarm);
  yield takeLatest(types.UNSUBSCRIBE_FROM_FARM, unsubscribeFromFarm);

  yield takeLatest(types.GET_NOTIFICATIONS, getNotifications);
  yield takeLatest(types.GET_SINGLE_POST, getSinglePost);
  yield takeLatest(types.LIKE_SINGLE_POST, likeSinglePost);
  yield takeLatest(types.UNLIKE_SINGLE_POST, unlikeSinglePost);
  yield takeLatest(types.ADD_COMMENT_TO_SINGLE_POST, addCommentToSinglePost);
  yield takeLatest(types.GET_SINGLE_POST_LIKES, getSinglePostLikes);
  yield takeLatest(types.GET_SINGLE_POST_COMMENTS, getSinglePostComments);
  yield takeLatest(types.GET_SINGLE_POST_SHARES, getSinglePostShares);

  yield takeLatest(types.SEARCH_USERS, searchUsers);
  yield takeLatest(types.SEARCH_FARMS, searchFarms);
  yield takeLatest(types.REQUEST_FARM_MEMBERSHIP, requestFarmMembership);
  yield takeLatest(
    types.CANCEL_FARM_MEMBERSHIP_REQUEST,
    cancelFarmMembershipRequest,
  );
  yield takeLatest(
    types.ACCEPT_FARM_MEMBERSHIP_REQUEST,
    acceptFarmMembershipRequest,
  );
  yield takeLatest(
    types.REJECT_FARM_MEMBERSHIP_REQUEST,
    rejectFarmMembershipRequest,
  );
  yield takeLatest(types.DELETE_FARM_MEMBER, deleteFarmMember);
  yield takeLatest(types.GET_FARM_MEMBERS, getFarmMembers);
}

export default initSaga;
