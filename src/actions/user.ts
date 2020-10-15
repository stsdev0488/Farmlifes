import {
  GET_USER_SUGGESTION,
  FOLLOW_USER_SUGGESTION,
  UNFOLLOW_USER_SUGGESTION,
  LOGIN,
  LOGOUT,
  SET_DEVICE_INFO,
  SET_FOLLOW_USER_SUGGESTION,
  GET_USER_SUGGESTION_FAILED,
  REAUTHENTICATE,
  REAUTHENTICATE_SUCCESS,
  REAUTHENTICATE_FAILURE,
} from './types';

export const reauthenticate = () => ({type: REAUTHENTICATE});
export const reauthenticateSuccess = user => ({type: REAUTHENTICATE_SUCCESS, user});
export const reauthenticateFailure = error => ({type: REAUTHENTICATE_FAILURE, error});

export const setDeviceInfo = data => ({
  type: SET_DEVICE_INFO,
  data,
});

export const getUserSuggestion = (coordinates, page,reload) => ({
  type: GET_USER_SUGGESTION,
  coordinates,
  page,
  reload,
});

export const getUserSuggestionFailed = () => ({
  type: GET_USER_SUGGESTION_FAILED,
});

// export const reloadUserSuggestion = (coordinates, page) => ({
//   type: RELOAD_USER_SUGGESTION,
//   coordinates,
//   page,
// });

export const follow = data => ({
  type: FOLLOW_USER_SUGGESTION,
  data,
});

export const unfollow = data => ({
  type: UNFOLLOW_USER_SUGGESTION,
  data,
});

export const login = (email: string, password: string) => ({
  type: LOGIN,
  email,
  password,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setFollowUserSuggestion =(data) => ({
   type: SET_FOLLOW_USER_SUGGESTION,
    id: data.target_id,
})
