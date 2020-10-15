import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';

import onboarding from './onBoarding';
import user from './user';
import feeds from './feeds';
import messenger from './messenger';
import suggestions from './suggestions';
import notifications from './notifications';
import view from './view';
import profile from './profile';
import farmProfile from './farmProfile';
import createOrEditFarmProfile from './createOrEditFarmProfile';
import * as types from '../actions/types';

const AppReducer = combineReducers({
  user,
  onboarding,
  messenger,
  feeds,
  suggestions,
  notifications,
  view,
  profile,
  farmProfile,
  createOrEditFarmProfile,
});

// Clean state when user logs out
export const rootReducer = (state = {}, action) => {
  if (action.type === types.LOGOUT) {
    AsyncStorage.removeItem('persist:root');
    state = undefined;
  }

  return AppReducer(state, action);
};

export default rootReducer;
