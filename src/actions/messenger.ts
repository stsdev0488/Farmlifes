import {
  SEND_USER_MESSAGE,
  GET_ALL_CONVERSATIONS,
  GET_FARM_CONVERSATIONS,
  GET_CONVERSATION_BETWEEN_TWO_PEOPLE,
  ADD_NEW_MESSAGE,
  UPDATE_MESSAGE_VIEWED_STATUS,
  UPDATE_MESSAGE_LAST_SENT,
} from './types';

export const getConversations = userId => ({
  type: GET_ALL_CONVERSATIONS,
  userId,
});

export const getFarmConversations = userId => ({
  type: GET_FARM_CONVERSATIONS,
  userId,
});

export const sendMessage = data => ({
  type: SEND_USER_MESSAGE,
  data,
});

export const updateMessageViewedStatus = messageId => ({
  type: UPDATE_MESSAGE_VIEWED_STATUS,
  messageId,
});

export const getConversationBtwPeople = data => ({
  type: GET_CONVERSATION_BETWEEN_TWO_PEOPLE,
  data,
});

export const updateMessageLastSent = data => ({
  type: UPDATE_MESSAGE_LAST_SENT,
  data
});