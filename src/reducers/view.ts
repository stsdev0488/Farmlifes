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
  REQUEST_FARM_MEMBERSHIP_SUCCESS,
  REQUEST_FARM_MEMBERSHIP_FAILURE,
  CANCEL_FARM_MEMBERSHIP_REQUEST,
  CANCEL_FARM_MEMBERSHIP_REQUEST_SUCCESS,
  CANCEL_FARM_MEMBERSHIP_REQUEST_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  farms: [],
  isLoadingForUsers: false,
  isLoadingForFarms: false,
  isChangingMembershipRequest: {},
};

export default (state: any = INITIAL_STATE, action: any) => {
  console.log('-------------- reducers')
  console.log(action, state);

  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        isLoadingForUsers: true,
      };
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.data.data,
        isLoadingForUsers: false,
      };
    case SEARCH_USERS_FAILED:
      return {
        ...state,
        isLoadingForUsers: false,
      };
    case SEARCH_FARMS:
      return {
        ...state,
        isLoadingForFarms: true,
      };
    case SEARCH_FARMS_SUCCESS:
      return {
        ...state,
        farms: action.data,
        isLoadingForFarms: false,
      };
    case SEARCH_FARMS_FAILED:
      return {
        ...state,
        isLoadingForFarms: false,
      };
    case REMOVE_USERS:
      return {
        ...state,
        users: [],
        isLoadingForUsers: false,
      };
    case REMOVE_FARMS:
      return {
        ...state,
        farms: [],
        isLoadingForFarms: false,
      };
    case REQUEST_FARM_MEMBERSHIP:
      return {
        ...state,
        isChangingMembershipRequest: {
          ...state.isChangingMembershipRequest,
          [action.farmId]: true,
        },
      };
    case REQUEST_FARM_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        isChangingMembershipRequest: {
          ...state.isChangingMembershipRequest,
          [action.farmId]: false,
        },
        farms: state.farms.map(farm => ({
          ...farm,
          membership_requested: farm.id === action.farmId ? true : farm.membership_requested,
          membership_request_id: action.membershipRequestId,
        })),
      };
    case REQUEST_FARM_MEMBERSHIP_FAILURE:
      return {
        ...state,
        isChangingMembershipRequest: {
          ...state.isChangingMembershipRequest,
          [action.farmId]: false,
        },
      };
    case CANCEL_FARM_MEMBERSHIP_REQUEST: {
      return {
        ...state,
        isChangingMembershipRequest: {
          ...state.isChangingMembershipRequest,
          [action.farmId]: true,
        },
      };
    }
    case CANCEL_FARM_MEMBERSHIP_REQUEST_SUCCESS:
      return {
        ...state,
        isChangingMembershipRequest: {
          ...state.isChangingMembershipRequest,
          [action.farmId]: false,
        },
        farms: state.farms.map(farm => ({
          ...farm,
          membership_requested: farm.id === action.farmId ? false : farm.membership_requested
        })),
      };
    case CANCEL_FARM_MEMBERSHIP_REQUEST_FAILURE:
      return {
        ...state,
        isChangingMembershipRequest: {
          ...state.isChangingMembershipRequest,
          [action.farmId]: false,
        },
      };
    default:
      return state;
  }
};
