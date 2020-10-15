import {
  GET_FEEDS,
  GET_FEEDS_STARTED,
  GET_FEEDS_FAILED,
  SET_FEEDS,
  POST_LIKED,
  POST_SHARED,
  POST_UNLIKED,
  SET_LOAD_MORE_START,
  ADD_MORE_COMMENTS_TO_POST,
  // ADD_COMMENT_TO_POST
  ADD_LIKES_TO_POST,
  ADD_COMMENTS_TO_POST,
  GET_ALL_POST_COMMENTS,
  GET_ALL_POST_LIKES,
  GET_ALL_POST_SHARES,
  ADD_NEW_POST,
  ADD_SHARES_TO_POST,
  CREATE_NEW_POST,
  START_IMAGE_UPLOAD,
  SHARE_POST,
  ADD_NEW_POST_FAILED,
  REMOVE_COMMENT_FROM_POST, DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  feeds: [],
  loading: true,
  error: false,
  modal: false,
  endLoadMore: false,
  feedType: null,

  deletingPosts: {},

  interactionLoadingState: {
    loadMore: true,
    comments: false,
    likes: false,
    shares: false,
  },
};

export default (state: any = INITIAL_STATE, action: any) => {
  const {type} = action;

  switch (type) {
    case CREATE_NEW_POST:
      return {...state, loading: true};

    case DELETE_POST:
    case DELETE_POST_SUCCESS:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletingPosts: {
          ...state.deletingPosts,
          [action.postId]: type === DELETE_POST,
        },
        feeds:
          type === DELETE_POST_SUCCESS
            ? state.feeds.filter(post => post.id !== action.postId)
            : state.feeds,
      };

    case START_IMAGE_UPLOAD:
      return {...state, loading: true};

    case SHARE_POST:
      return {...state, loading: true};

    case ADD_NEW_POST_FAILED:
      return {...state, loading: false};

    case SET_LOAD_MORE_START:
      let interactionLoadingState = state.interactionLoadingState;
      interactionLoadingState.loadMore = action.loading;
      return {...state, loading: false, interactionLoadingState};
    case GET_ALL_POST_LIKES:
      interactionLoadingState = state.interactionLoadingState;
      interactionLoadingState.likes = true;
      return {...state, loading: false, interactionLoadingState};

    case GET_ALL_POST_COMMENTS:
      interactionLoadingState = state.interactionLoadingState;
      interactionLoadingState.comments = true;
      return {...state, loading: false, interactionLoadingState};

    case GET_ALL_POST_SHARES:
      interactionLoadingState = state.interactionLoadingState;
      interactionLoadingState.shares = true;
      return {...state, loading: false, interactionLoadingState};

    case GET_FEEDS:
      interactionLoadingState = state.interactionLoadingState;
      interactionLoadingState.loadMore = false;
      if (action.data.page > 1) {
        return {...state, loading: true, interactionLoadingState};
      } else {
        return {...state, loading: true, feeds: [], interactionLoadingState};
      }

    case SET_FEEDS:
      let feeds = state.feeds;
      interactionLoadingState = state.interactionLoadingState;
      interactionLoadingState.loadMore = false;

      // concat new feeds and filter for unique feeds
      feeds = feeds
        .concat(...action.feeds)
        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      return {
        ...state,
        feeds,
        loading: false,
        interactionLoadingState,
        feedType: action.feedType,
        endLoadMore: action.endLoadMore,
      };

    case GET_FEEDS_FAILED:
      interactionLoadingState = state.interactionLoadingState;
      interactionLoadingState.loadMore = false;
      return {...state, loading: false, interactionLoadingState};

    case POST_LIKED:
      feeds = state.feeds;

      let postToModify = feeds.find(c => c.id === action.postId);
      postToModify.liked = !postToModify.liked;
      postToModify.likes_count++;
      feeds = feeds.map(c => {
        if (c.id === action.postId) {
          c = postToModify;
          return c;
        }
        return c;
      });
      return {...state, ...feeds};
    case POST_UNLIKED:
      feeds = state.feeds;
      postToModify = feeds.find(c => c.id === action.postId);
      postToModify.liked = !postToModify.liked;
      postToModify.likes_count--;
      feeds = feeds
        .map(c => {
          if (c.id === action.postId) {
            c = postToModify;
            return c;
          }
          return c;
        });
      return {...state, ...feeds};

    // case POST_SHARED:
    //   return {...state };

    case ADD_LIKES_TO_POST:
      feeds = state.feeds;
      interactionLoadingState = state.interactionLoadingState;
      postToModify = feeds.find(c => c.id === action.postId);
      postToModify.likers = action.data.reverse();
      feeds = feeds.map(c => {
        if (c.id === action.postId) {
          c = postToModify;
          return c;
        }
        return c;
      })
      interactionLoadingState.likes = false;

      return {...state, ...feeds, ...interactionLoadingState};

    case ADD_SHARES_TO_POST:
      feeds = state.feeds;
      interactionLoadingState = state.interactionLoadingState;
      postToModify = feeds.find(c => c.id === action.postId);
      postToModify.sharers = action.data.reverse();
      feeds = feeds.map(c => {
        if (c.id === action.postId) {
          c = postToModify;
          return c;
        }
        return c;
      });
      interactionLoadingState.shares = false;

      return {...state, ...feeds, ...interactionLoadingState};

    case ADD_COMMENTS_TO_POST:
      feeds = state.feeds;
      interactionLoadingState = state.interactionLoadingState;
      postToModify = feeds.find(c => c.id === action.postId);
      postToModify.commenters = action.data.reverse();
      feeds = feeds.map(c => {
        if (c.id === action.postId) {
          c = postToModify;
          return c;
        }
        return c;
      });
      interactionLoadingState.comments = false;

      return {...state, ...feeds, ...interactionLoadingState};

    case ADD_MORE_COMMENTS_TO_POST:
      feeds = state.feeds;
      postToModify = feeds.find(c => c.id === action.postId);
      postToModify.commenters.push(action.data);
      postToModify.comments_count++;
      feeds = feeds.map(c => {
        if (c.id === action.postId) {
          c = postToModify;
          return c;
        }
        return c;
      });
      return {...state, ...feeds};

    case REMOVE_COMMENT_FROM_POST:
      feeds = state.feeds;
      postToModify = feeds.find(c => c.id === action.postId);
      const newCommentData = postToModify.commenters.filter(
        c => c.id !== action.commentId.id,
      );

      postToModify.commenters = newCommentData;
      postToModify.comments_count--;

      return {...state, ...feeds};

    case ADD_NEW_POST:
      feeds = state.feeds;
      feeds.unshift(action.post);
      if (action.oldPostID) {
        postToModify = feeds.find(c => c.id === action.oldPostID);

        if (postToModify) {
          postToModify.shares_count++;
          feeds = feeds
            .map(c => {
              if (c.id === action.postId) {
                c = postToModify;
                return c;
              }
              return c;
            })
            .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        }
      }
      return {...state, ...feeds, loading: false};

    default:
      return state;
  }
};
