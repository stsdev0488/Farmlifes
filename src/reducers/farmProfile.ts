import {
  ACCEPT_FARM_MEMBERSHIP_REQUEST,
  ACCEPT_FARM_MEMBERSHIP_REQUEST_FAILURE,
  ACCEPT_FARM_MEMBERSHIP_REQUEST_SUCCESS,
  DELETE_FARM_MEMBER,
  DELETE_FARM_MEMBER_FAILURE,
  DELETE_FARM_MEMBER_SUCCESS,
  GET_CONVERSATION_WITH_FARM,
  GET_CONVERSATION_WITH_FARM_FAILURE,
  GET_CONVERSATION_WITH_FARM_SUCCESS,
  GET_FARM,
  GET_FARM_FAILURE,
  GET_FARM_MEMBERS,
  GET_FARM_MEMBERS_FAILURE,
  GET_FARM_MEMBERS_SUCCESS,
  GET_FARM_SUCCESS,
  REJECT_FARM_MEMBERSHIP_REQUEST,
  REJECT_FARM_MEMBERSHIP_REQUEST_FAILURE,
  REJECT_FARM_MEMBERSHIP_REQUEST_SUCCESS,
  SUBSCRIBE_TO_FARM,
  SUBSCRIBE_TO_FARM_FAILURE,
  SUBSCRIBE_TO_FARM_SUCCESS,
  UNSUBSCRIBE_FROM_FARM,
  UNSUBSCRIBE_FROM_FARM_FAILURE,
  UNSUBSCRIBE_FROM_FARM_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  farm: null,
  loading: false,
  error: null,
  loadingConversation: false,
  conversation: null,
  isSubscribing: false,
  isUnsubscribing: false,
  members: [],
  isLoadingMembers: false,
  hasMoreMembers: true,
  acceptingMemberships: {},
  rejectingMemberships: {},
  deletingMembers: {},
};

interface State {
  farm: any;
  loading: boolean;
  error: any;
  loadingConversation: boolean;
  conversation: any;
  isSubscribing: boolean;
  isUnsubscribing: boolean;
  members: any;
  isLoadingMembers: boolean;
  hasMoreMembers: boolean;
  acceptingMemberships: any;
  rejectingMemberships: any;
  deletingMembers: any;
}

interface Action {
  type: string;
  [key: string]: any;
}

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case GET_FARM:
      return {...state, loading: true, farm: null, members: []};
    case GET_FARM_SUCCESS:
      return {...state, loading: false, farm: action.farm};
    case GET_FARM_FAILURE:
      return {...state, loading: false, error: true};

    case GET_CONVERSATION_WITH_FARM:
      return {...state, loadingConversation: true, conversation: null};
    case GET_CONVERSATION_WITH_FARM_SUCCESS:
      return {
        ...state,
        loadingConversation: false,
        conversation: action.conversation,
      };
    case GET_CONVERSATION_WITH_FARM_FAILURE:
      return {...state, loadingConversation: false, error: action.error};

    case SUBSCRIBE_TO_FARM:
      return {...state, isSubscribing: true};
    case SUBSCRIBE_TO_FARM_SUCCESS:
      return {
        ...state,
        isSubscribing: false,
        farm: state.farm
          ? {
              ...state.farm,
              i_am_subscribed: true,
              subscribers: (state.farm.subscribers || 0) + 1,
            }
          : null,
      };
    case SUBSCRIBE_TO_FARM_FAILURE:
      return {...state, isSubscribing: false, error: action.error};

    case UNSUBSCRIBE_FROM_FARM:
      return {...state, isUnsubscribing: true};
    case UNSUBSCRIBE_FROM_FARM_SUCCESS:
      return {
        ...state,
        isUnsubscribing: false,
        farm: state.farm
          ? {
              ...state.farm,
              i_am_subscribed: false,
              subscribers: (state.farm.subscribers || 0) - 1,
            }
          : null,
      };
    case UNSUBSCRIBE_FROM_FARM_FAILURE:
      return {...state, isUnsubscribing: false, error: action.error};
    case GET_FARM_MEMBERS:
      return {
        ...state,
        isLoadingMembers: true,
        members: action.page === 1 ? [] : state.members,
        acceptingMemberships: {},
        deletingMembers: {},
        rejectingMemberships: {},
      };
    case GET_FARM_MEMBERS_SUCCESS:
      return {
        ...state,
        isLoadingMembers: false,
        members: [...state.members, ...(action.members || [])],
        hasMoreMembers: action.hasMoreMembers,
      };
    case GET_FARM_MEMBERS_FAILURE:
      return {...state, isLoadingMembers: false};
    case ACCEPT_FARM_MEMBERSHIP_REQUEST:
      return {
        ...state,
        acceptingMemberships: {
          ...state.acceptingMemberships,
          [action.membershipRequestId]: true,
        },
      };
    case ACCEPT_FARM_MEMBERSHIP_REQUEST_SUCCESS:
      return {
        ...state,
        acceptingMemberships: {
          ...state.acceptingMemberships,
          [action.membershipRequestId]: false,
        },
        members: [
          ...state.members.filter(
            member =>
              member.membership_request_id &&
              member.membership_request_id !== action.membershipRequestId,
          ),
          {
            ...state.members.find(member => member.membership_request_id),
            membership_request_id: null,
          },
          ...state.members.filter(member => !member.membership_request_id),
        ],
      };
    case ACCEPT_FARM_MEMBERSHIP_REQUEST_FAILURE:
      return {
        ...state,
        acceptingMemberships: {
          ...state.acceptingMemberships,
          [action.membershipRequestId]: false,
        },
      };
    case REJECT_FARM_MEMBERSHIP_REQUEST:
    case REJECT_FARM_MEMBERSHIP_REQUEST_SUCCESS:
    case REJECT_FARM_MEMBERSHIP_REQUEST_FAILURE:
      return {
        ...state,
        rejectingMemberships: {
          ...state.rejectingMemberships,
          [action.membershipRequestId]:
            action.type === REJECT_FARM_MEMBERSHIP_REQUEST,
        },
        members:
          action.type === REJECT_FARM_MEMBERSHIP_REQUEST_SUCCESS
            ? state.members.filter(member => member.membership_request_id !== action.membershipRequestId)
            : state.members,
      };
    case DELETE_FARM_MEMBER:
      return {
        ...state,
        deletingMembers: {
          ...state.deletingMembers,
          [action.memberId]: true,
        },
      };
    case DELETE_FARM_MEMBER_SUCCESS:
      return {
        ...state,
        deletingMembers: {
          ...state.deletingMembers,
          [action.memberId]: false,
        },
        members: state.members.filter(member => member.id !== action.memberId),
      };
    case DELETE_FARM_MEMBER_FAILURE:
      return {
        ...state,
        deletingMembers: {
          ...state.deletingMembers,
          [action.memberId]: false,
        },
      };

    default:
      return state;
  }
};
