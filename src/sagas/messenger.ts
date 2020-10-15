import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import {
  sendMessage as apiSendMessage,
  getUserConveration as apiGetUserConversation,
  getConversationBetweenUsers as apiGetConversationBetweenUsers,
  getConverationBetweenPeople as apiGetConversationMessages,
  getMyUser,
} from '_services/api';

import {showMessage} from 'react-native-flash-message';

import {setConversationBetweenUsers} from "../actions/profile";
import {
  GET_CONVERSATION_MESSAGES_SUCCESS,
  GET_CONVERSATION_MESSAGES_FAILURE
} from '../actions/types';
import {act} from "react-test-renderer";

export function* sendUserMessage(action) {
  try {
    const response = yield call(apiSendMessage, action.data);
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't perform",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* getAllConversations(action) {
  try {
    const response = yield call(apiGetUserConversation, action.userId);

    if (response.status === 200) {
      yield put({
        type:
          action.userId === null
            ? types.SET_CONVERSATIONS
            : types.SET_FARM_CONVERSATIONS,
        data: response.data,
      });
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't perform",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* getFarmConversations(action) {
  try {

    const response = yield call(apiGetUserConversation, action.userId);

    if (response.status === 200) {
      yield put({
        type: types.SET_FARM_CONVERSATIONS,
        data: response.data,
      });
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't perform",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* getConversation(action) {
  try {
    const response = yield call(apiGetUserConversation, action.data);
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Couldn't perform",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* getConversationBetweenUsers(action) {
  try {
    const response = yield call(
      apiGetConversationBetweenUsers,
      action.userId1,
      action.userId2,
    );

    if (response.data && response.data.id) {
      yield put(setConversationBetweenUsers(response.data));

      if (action.onSuccess) {
        action.onSuccess(response.data);
      }
    }
  } catch (err) {
    showMessage({
      message: err.message,
      description: "Conversation not found",
      type: 'danger',
      hideOnPress: true,
    });
  }
}

export function* getConversationMessages(action) {
  try {
    const response = yield call(apiGetConversationMessages, action.payload.conversationId, action.payload.page);
    if (response.ok && response.data) {
      yield put({type: GET_CONVERSATION_MESSAGES_SUCCESS, messages: response.data});
    } else {
      throw response;
    }
  } catch (e) {
    showMessage({
      message: e.message,
      description: 'Couldn\'t load messages',
      type: 'danger',
      hideOnPress: true,
    });
    yield put({type: GET_CONVERSATION_MESSAGES_FAILURE, error: e})
  }
};
