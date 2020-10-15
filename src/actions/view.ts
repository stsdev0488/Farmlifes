import {
  SEARCH_USERS,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILED,
  SEARCH_FARMS,
  SEARCH_FARMS_SUCCESS,
  SEARCH_FARMS_FAILED,
  REMOVE_USERS,
  REMOVE_FARMS,
  REQUEST_FARM_MEMBERSHIP,
  CANCEL_FARM_MEMBERSHIP_REQUEST,
  ACCEPT_FARM_MEMBERSHIP_REQUEST,
  REJECT_FARM_MEMBERSHIP_REQUEST,
  DELETE_FARM_MEMBER,
} from './types';

export const searchUsers = (searchText) => ({
  type: SEARCH_USERS,
  searchText,
});

export const searchUsersSuccess = (data) => ({
  type: SEARCH_USERS_SUCCESS,
  data,
});

export const searchUsersFailed = (error) => ({
  type: SEARCH_USERS_FAILED,
  error,
});

export const searchFarms = (searchText, joinFarm) => ({
  type: SEARCH_FARMS,
  searchText,
  joinFarm,
});

export const searchFarmsSuccess = (data) => ({
  type: SEARCH_FARMS_SUCCESS,
  data,
});

export const searchFarmsFailed = (error) => ({
  type: SEARCH_FARMS_FAILED,
  error,
});

export const removeUsers = () => ({
  type: REMOVE_USERS,
});

export const removeFarms = () => ({
  type: REMOVE_FARMS,
});

export const requestFarmMembership = farmId => ({
  type: REQUEST_FARM_MEMBERSHIP,
  farmId,
});

export const cancelFarmMembershipRequest = (farmId, membershipRequestId) => ({
  type: CANCEL_FARM_MEMBERSHIP_REQUEST,
  farmId,
  membershipRequestId,
});

export const acceptFarmMembershipRequest = (farmId, membershipRequestId) => ({
  type: ACCEPT_FARM_MEMBERSHIP_REQUEST,
  farmId,
  membershipRequestId,
});

export const rejectFarmMembershipRequest = (farmId, membershipRequestId) => ({
  type: REJECT_FARM_MEMBERSHIP_REQUEST,
  farmId,
  membershipRequestId,
});

export const deleteFarmMember = (farmId, memberId) => ({
  type: DELETE_FARM_MEMBER,
  farmId,
  memberId,
});
