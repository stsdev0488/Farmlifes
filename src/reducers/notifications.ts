import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED,
  GET_SINGLE_POST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILED,
  LIKE_SINGLE_POST_SUCCESS,
  UNLIKE_SINGLE_POST_SUCCESS,
  ADD_COMMENT_TO_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_LIKES,
  GET_SINGLE_POST_LIKES_SUCCESS,
  GET_SINGLE_POST_LIKES_FAILED,
  GET_SINGLE_POST_COMMENTS,
  GET_SINGLE_POST_COMMENTS_SUCCESS,
  GET_SINGLE_POST_COMMENTS_FAILED,
  GET_SINGLE_POST_SHARES,
  GET_SINGLE_POST_SHARES_SUCCESS,
  GET_SINGLE_POST_SHARES_FAILED,
} from '../actions/types';

const notificationsReducer = (
  state = {
    singlePost: {},
    notifications: [],
    loading: false,
    interactionLoadingState: {
      likes: false,
      comments: false,
      shares: false,
    },
  },
  action,
) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.data,
        loading: false,
      };
    case GET_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_SINGLE_POST:
      return {
        ...state,
        singlePost: {},
        loading: true,
      };
    case GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: action.data,
        loading: false,
      };
    case GET_SINGLE_POST_FAILED:
      return {
        ...state,
        loading: false,
      };
    case LIKE_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          liked: true,
          likes_count: state.singlePost.likes_count + 1,
        },
      };
    case UNLIKE_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          liked: false,
          likes_count: state.singlePost.likes_count - 1,
        },
      };
    case ADD_COMMENT_TO_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          commenters: [
            ...state.singlePost.commenters,
            action.data,
          ],
          comments_count: state.singlePost.comments_count + 1,
        },
      };
    case GET_SINGLE_POST_LIKES:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          likes: true,
        },
      };
    case GET_SINGLE_POST_LIKES_SUCCESS:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          likes: false,
        },
        singlePost: {
          ...state.singlePost,
          likers: action.data.reverse(),
        },
      };
    case GET_SINGLE_POST_LIKES_FAILED:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          likes: false,
        },
      };
    case GET_SINGLE_POST_COMMENTS:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          comments: true,
        },
      };
    case GET_SINGLE_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          comments: false,
        },
        singlePost: {
          ...state.singlePost,
          commenters: action.data.reverse(),
        },
      };
    case GET_SINGLE_POST_COMMENTS_FAILED:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          comments: false,
        },
      };
    case GET_SINGLE_POST_SHARES:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          shares: true,
        },
      };
    case GET_SINGLE_POST_SHARES_SUCCESS:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          shares: false,
        },
        singlePost: {
          ...state.singlePost,
          sharers: action.data.reverse(),
        },
      };
    case GET_SINGLE_POST_SHARES_FAILED:
      return {
        ...state,
        interactionLoadingState: {
          ...state.interactionLoadingState,
          shares: false,
        },
      };
    default:
      return state;
  }
};

export default notificationsReducer;
