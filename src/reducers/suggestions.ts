import {
  SET_USER_SUGGESTION,
  SET_FOLLOW_USER_SUGGESTION,
  SET_UNFOLLOW_USER_SUGGESTION,
  SUGGESTION_LOAD_MORE,
  GET_SUGGESTION,
  SET_USER_SUGGESTION_IN_FINDPEOPLE,
  GET_USER_SUGGESTION_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  suggestions: [],
  suggestionsLoading: true,
  suggestionsLoadMore: false,
  endLoadMore: false,
};

export default (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SUGGESTION_LOAD_MORE:
      return {...state, suggestionsLoadMore: true};

    case GET_SUGGESTION:
      return {
        ...state,
        reload: action.reload,
        loading: false,
        suggestionsLoading: true,
      };

    case SET_USER_SUGGESTION:
      let suggestions = state.suggestions;
      suggestions = suggestions.concat(...action.suggestions);

      suggestions = suggestions
        .map(c => {
          c.modified = false;
          // c.subscribed
          return c;
        })
        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      return {
        ...state,
        loading: false,
        suggestionsLoading: false,
        suggestionsLoadMore: false,
        endLoadMore: action.endLoadMore,
        suggestions,
      };

    case SET_FOLLOW_USER_SUGGESTION:
      const ns = state.suggestions.filter(c => c.id !== action.id);
      return {
        ...state,
        loading: false,
        suggestions: ns,
      };

    case GET_USER_SUGGESTION_FAILED:
      return {
        loading: false,
        suggestionsLoading: false,
        suggestionsLoadMore: false,
        suggestions: [],
      };

    case SET_USER_SUGGESTION_IN_FINDPEOPLE:
      suggestions = state.suggestions;
      suggestions = suggestions
        .map(c => {
          c.status === action.status;
          return c;
        })
        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      return {
        ...state,
        loading: false,
        suggestions,
      };

    case SET_UNFOLLOW_USER_SUGGESTION:
      suggestions = state.suggestions;
      suggestions = suggestions
        .map(c => {
          if (c.id === action.id) {
            c.subscribed = false;
            c.modified = true;
            return c;
          }
          return c;
        })
        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      return {
        ...state,
        loading: false,
        suggestions,
      };

    default:
      return state;
  }
};
