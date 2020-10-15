import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import {
  login as apiLogin,
  register as apiRegister,
  acceptPushNotification as apiAcceptPushNotification,
  reauthenticate as apiReauthenticate,
} from '_services/api';
import NavigationService from '_services/navigationService';
import {strings} from '../utils/i18n';

import {client_id, client_secret, grant_type} from '_config/constants';

import {store} from '../store';
import {reauthenticateFailure, reauthenticateSuccess} from "../actions/user";
import {showMessage} from "react-native-flash-message";

export function* login(action: {email: string; password: string}) {
  try {
    yield put({type: types.LOGIN_STARTED});

    const data = {
      client_id,
      client_secret,
      grant_type,
      username: action.email,
      password: action.password,
    };

    const response = yield call(apiLogin, data);

    const storeData = store.getState();
     const deviceId =
       storeData &&
       storeData.user &&
       storeData.user.deviceInfo &&
       storeData.user.deviceInfo.userId;

       // TODO: catch error incase of failure
      apiAcceptPushNotification({ onesignal_player_id: deviceId });

    // Was the login successful?
    if (response.status === 200) {

      // Save user information to the redux state
      yield put({type: types.LOGGED_IN, user: response.data});
      NavigationService.navigate('FindPeople');
    } else {
      showMessage({
        message: strings('Error.error'),
        description: strings('Error.wrongEmailOrPassword'),
        type: 'danger',
        hideOnPress: true,
      });
      yield put({type: types.LOGIN_FAILED});
    }
  } catch (e) {
    yield put({type: types.LOGIN_FAILED});
    throw e;
  }
}

export function* register(action: {data: any}) {
  try {
    yield put({type: types.REGISTER_STARTED});
    const response = yield call(apiRegister, action.data);

    // Was the Registration successful?
    if (response.status === 201) {
      yield put({
        type: types.LOGIN,
        email: action.data.email,
        password: action.data.password,
      });

    } else {
      alert('failed');
      yield put({type: types.REGISTER_FAILED});
    }
  } catch (e) {
    yield put({type: types.REGISTER_FAILED});
    throw e;
  }
}

export function* reauthenticate() {
  try {
    const response = yield call(apiReauthenticate);
    yield put(reauthenticateSuccess(response.data));
  } catch (e) {
    yield put(reauthenticateFailure(e));
  }
}

export function* setDeviceInfo(action) {
  try {
    yield call(apiAcceptPushNotification, {onesignal_player_id: action.data.userId});
  } catch (e) {
    //
  }
}
