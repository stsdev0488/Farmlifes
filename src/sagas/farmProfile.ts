import {call, put, all} from 'redux-saga/effects';
import * as farmProfileActions from '../actions/farmProfile';
import * as api from '../services/api';
import {
  CREATE_OR_EDIT_FARM_FAILURE,
  CREATE_OR_EDIT_FARM_SUCCESS,
  GET_CONVERSATION_WITH_FARM_FAILURE,
  GET_FARM_CATEGORIES_SUCCESS,
  SUBSCRIBE_TO_FARM_SUCCESS,
  SUBSCRIBE_TO_FARM_FAILURE,
  UNSUBSCRIBE_FROM_FARM_SUCCESS,
  UNSUBSCRIBE_FROM_FARM_FAILURE,
  GET_FARM_MEMBERS_FAILURE,
  GET_FARM_MEMBERS_SUCCESS,
  ACCEPT_FARM_MEMBERSHIP_REQUEST_SUCCESS,
  ACCEPT_FARM_MEMBERSHIP_REQUEST_FAILURE,
  DELETE_FARM_MEMBER_FAILURE,
  DELETE_FARM_MEMBER_SUCCESS, REJECT_FARM_MEMBERSHIP_REQUEST_SUCCESS, REJECT_FARM_MEMBERSHIP_REQUEST_FAILURE,
} from '../actions/types';
import {showMessage} from 'react-native-flash-message';
import {unfollow} from '../services/api';
import {reauthenticate} from '../actions/user';

export function* getFarm(action: { farmId: number }): void {
  try {
    const response = yield call(api.getFarm, action.farmId);

    if (response.data) {
      yield put(farmProfileActions.getFarmSuccess(response.data));
    } else {
      throw response;
    }
  } catch (e) {
    yield put(farmProfileActions.getFarmFailure(e));
  }
}

export function* getFarmCategories(): void {
  try {
    const response = yield call(api.getFarmCategories);
    if (response.data && response.data.data) {
      yield put({
        type: GET_FARM_CATEGORIES_SUCCESS,
        categories: response.data.data,
      });
    }
  } catch (e) {
    //
  }
}

export function* createOrEditFarm(action) {
  try {
    let [profileImage, titleImage] = yield all([
      call(api.uploadLocalImageToServer, action.farm.profile_image),
      call(api.uploadLocalImageToServer, action.farm.title_image),
    ]);

    const response = yield call(api.createOrEditFarm, {
      ...action.farm,
      profile_image: profileImage && profileImage.data && profileImage.data.token || '',
      title_image: titleImage && titleImage.data && titleImage.data.token || '',
    });

    if (response.data && (response.status === 200 || response.status === 201)) {
      yield put({type: CREATE_OR_EDIT_FARM_SUCCESS, farm: response.data});
      yield put(reauthenticate());
    } else {
      throw response;
    }
  } catch (e) {
    yield put({type: CREATE_OR_EDIT_FARM_FAILURE, error: e});
  }
}

export function* getConversationWithFarmSaga(action: any) {
  try {
    const response = yield call(api.getConversationWithFarm, action.data);

    if (response.data && response.data.id) {
      if (action.onSuccess) {
        action.onSuccess(response.data);
      }
    } else {
      throw response;
    }
  } catch (e) {
    showMessage({
      message: e.message,
      description: 'Couldn\'t get conversation. Please try again',
      type: 'danger',
      hideOnPress: true,
    });
    yield put({
      type: GET_CONVERSATION_WITH_FARM_FAILURE,
      error: e,
    });
  }
}

export function* subscribeToFarm(action) {
  try {
    const response = yield call(api.follow, {'target_type': 'farm', 'target_id': action.farmId});

    if (response && response.data) {
      yield put({type: SUBSCRIBE_TO_FARM_SUCCESS});
    } else {
      throw response;
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: 'Couldn\'t subscribe to farm',
      type: 'danger',
      hideOnPress: true,
    });

    yield put({
      type: SUBSCRIBE_TO_FARM_FAILURE,
      error: err
    });
  }
}

export function* unsubscribeFromFarm(action) {
  try {
    const response = yield call(unfollow, {'target_type': 'farm', 'target_id': action.farmId});

    if (response && response.data) {
      yield put({type: UNSUBSCRIBE_FROM_FARM_SUCCESS});
    } else {
      throw response;
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: 'Couldn\'t unsubscribe from farm',
      type: 'danger',
      hideOnPress: true,
    });

    yield put({
      type: UNSUBSCRIBE_FROM_FARM_FAILURE,
      error: err,
    });
  }
}

export function* getFarmMembers(action) {
  try {
    const response = yield call(api.getFarmMembers, action.farmId, action.page);

    if (response.data && response.data.data) {
      yield put({
        type: GET_FARM_MEMBERS_SUCCESS,
        members: response.data.data,
        hasMoreMembers:
          response.data.meta && response.data.meta.current_page < response.data.meta.last_page,
      });
    } else {
      throw response;
    }
  } catch (e) {
    yield put({
      type: GET_FARM_MEMBERS_FAILURE,
    });
  }
}

export function* acceptFarmMembershipRequest(action) {
  try {
    const response = yield call(
      api.acceptFarmMembershipRequest,
      action.farmId,
      action.membershipRequestId,
    );

    if (response.status === 201) {
      yield put({
        type: ACCEPT_FARM_MEMBERSHIP_REQUEST_SUCCESS,
        membershipRequestId: action.membershipRequestId,
      });
    } else {
      throw response;
    }
  } catch (e) {
    yield put({
      type: ACCEPT_FARM_MEMBERSHIP_REQUEST_FAILURE,
      membershipRequestId: action.membershipRequestId,
    });
  }
}

export function* rejectFarmMembershipRequest(action) {
  try {
    const response = yield call(
      api.cancelFarmMembershipRequest,
      action.farmId,
      action.membershipRequestId,
    );

    if (response.status === 204) {
      yield put({
        type: REJECT_FARM_MEMBERSHIP_REQUEST_SUCCESS,
        membershipRequestId: action.membershipRequestId,
      });
    } else {
      throw response;
    }
  } catch (e) {
    yield put({
      type: REJECT_FARM_MEMBERSHIP_REQUEST_FAILURE,
      membershipRequestId: action.membershipRequestId,
    });
  }
}

export function* deleteFarmMember(action) {
  try {
    const response = yield call(api.deleteFarmMember, action.farmId, action.memberId);

    if (response.status === 204) {
      yield put({
        type: DELETE_FARM_MEMBER_SUCCESS,
        memberId: action.memberId,
      });
    } else {
      throw response;
    }
  } catch (e) {
    yield put({
      type: DELETE_FARM_MEMBER_FAILURE,
      memberId: action.memberId,
    });
  }
}
