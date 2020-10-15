import {
  FOLLOW_USER,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  GET_CONVERSATION_BETWEEN_USERS,
  GET_PROFILE_USER,
  SET_CONVERSATION_BETWEEN_USERS,
  SET_PROFILE_USER,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  loadingConversation: false,
  user: null,
  conversation: null,
  isFollowing: false,
  isFollowLoading: false,
};

export default (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_PROFILE_USER:
      return {...state, loading: true, user: null, conversation: null};
    case SET_PROFILE_USER:
      return {
        ...state,
        loading: false,
        user: action.user,
        isFollowing: action.user && action.user['i_am_following'],
      };
    case GET_CONVERSATION_BETWEEN_USERS:
      return {...state, loadingConversation: true, conversation: null};
    case SET_CONVERSATION_BETWEEN_USERS:
      return {
        ...state,
        loadingConversation: false,
        conversation: action.conversation,
      };
    case FOLLOW_USER:
      return {...state, isFollowLoading: true, isFollowing: false};
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        isFollowLoading: false,
        isFollowing: true,
        user: state.user
          ? {
              ...state.user,
              subscribers: state.user.subscribers
                ? state.user.subscribers + 1
                : undefined,
            }
          : null,
      };
    case FOLLOW_USER_FAILURE:
      return {...state, isFollowLoading: false};
    case UNFOLLOW_USER:
      return {...state, isFollowLoading: true, isFollowing: true};
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        isFollowLoading: false,
        isFollowing: false,
        user: state.user
          ? {
              ...state.user,
              subscribers: state.user.subscribers
                ? state.user.subscribers - 1
                : undefined,
            }
          : null,
      };
    case UNFOLLOW_USER_FAILURE:
      return {...state, isFollowLoading: false};
    default:
      return state;
  }
};
