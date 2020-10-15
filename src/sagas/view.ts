import {call, put} from 'redux-saga/effects';

import {
  searchFarmsSuccess,
  searchFarmsFailed,
  searchUsersSuccess,
  searchUsersFailed,
  removeUsers,
  removeFarms,
} from '../actions/view';
import {
  searchUsers as apiSearchUsers,
  searchFarms as apiSearchFarms,
  requestFarmMembership as apiRequestFarmMembership,
  cancelFarmMembershipRequest as apiCancelFarmMembershipRequest
} from '_services/api';
import {
  CANCEL_FARM_MEMBERSHIP_REQUEST_FAILURE,
  CANCEL_FARM_MEMBERSHIP_REQUEST_SUCCESS,
  REQUEST_FARM_MEMBERSHIP_FAILURE,
  REQUEST_FARM_MEMBERSHIP_SUCCESS,
} from '../actions/types';
import {showMessage} from 'react-native-flash-message';
import {strings} from '../utils/i18n';

export function* searchUsers(action) {
  const {
    searchText
  } = action;

  try {
    if (searchText.length < 2) {
      yield put(removeUsers());
      return;
    }

    const { data } = yield call(apiSearchUsers, searchText);
    yield put(searchUsersSuccess(data.data));
  } catch (error) {
    yield put(searchUsersFailed(error));
  }
}

export function* searchFarms(action) {
  const {
    searchText,
    joinFarm,
  } = action;

  try {
    if (searchText.length < 2) {
      yield put(removeFarms());
      return;
    }

    const {data} = yield call(apiSearchFarms, searchText, joinFarm);
    yield put(searchFarmsSuccess(data.data));
  } catch (error) {
    yield put(searchFarmsFailed(error));
  }
}

export function* requestFarmMembership(action) {
  try {
    const response = yield call(apiRequestFarmMembership, action.farmId);
    console.info('api request farm membership', response);

    if (response.data) {
      yield put({
        type: REQUEST_FARM_MEMBERSHIP_SUCCESS,
        farmId: action.farmId,
        membershipRequestId: response.data.id,
      });
    } else {
      throw response;
    }
  } catch (e) {
    yield put({
      type: REQUEST_FARM_MEMBERSHIP_FAILURE,
      farmId: action.farmId,
    });
    showMessage({
      type: 'danger',
      message: strings('Error.error'),
      description: strings('Error.pleaseTryAgain'),
      hideOnPress: true,
    });
  }
}

export function* cancelFarmMembershipRequest(action) {
  try {
    const response = yield call(
      apiCancelFarmMembershipRequest,
      action.farmId,
      action.membershipRequestId,
    );
    console.info('apiCancelFarmMembershipRequest', response);

    if (response.status === 204) {
      yield put({
        type: CANCEL_FARM_MEMBERSHIP_REQUEST_SUCCESS,
        farmId: action.farmId,
      });
    } else {
      throw response;
    }
  } catch (e) {
    yield put({
      type: CANCEL_FARM_MEMBERSHIP_REQUEST_FAILURE,
      farmId: action.farmId,
    });
    showMessage({
      type: 'danger',
      message: strings('Error.error'),
      description: strings('Error.pleaseTryAgain'),
      hideOnPress: true,
    });
  }
}
