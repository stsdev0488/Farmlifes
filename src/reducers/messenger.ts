import {
  SET_CONVERSATIONS,
  SET_FARM_CONVERSATIONS,
  UPDATE_MESSAGE_VIEWED_STATUS,
  ADD_NEW_MESSAGE,
  UPDATE_MESSAGE_LAST_SENT,
} from '../actions/types';


import { removeDuplicatesFromArray } from '_services/helpers';
import {act} from "react-test-renderer";
import uniqWith from 'lodash/uniqWith';

const messengerReducer = (
  state = {
    messages: [],
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case SET_CONVERSATIONS:
      let messages = state.messages;
      return {
        ...state,
        messages: uniqWith(
          [...action.data, ...messages],
          (conversation1, conversation2) =>
            conversation1.id === conversation2.id && conversation1.farm === conversation2.farm,
        ).filter(conversation => conversation.last_message),
        loading: false,
      };

    case SET_FARM_CONVERSATIONS:
      messages = state.messages;
      const farmMessages = action.data.map(conversation => ({...conversation, farm: true}));

      return {
        ...state,
        messages: uniqWith(
          [...farmMessages, ...state.messages],
          (conversation1, conversation2) =>
            conversation1.id === conversation2.id && conversation1.farm === conversation2.farm
        ).filter(conversation => conversation.last_message),
      };

    case UPDATE_MESSAGE_VIEWED_STATUS:
      messages = state.messages;
      messages = messages
        .filter(c => c !== undefined)
        .map(c => {
          if (c.last_message && c.id === action.messageId) {
            c.last_message.seen = 1;
            return c;
          }
          return c;
        });
      return {...state, messages};

    case UPDATE_MESSAGE_LAST_SENT:
      let latestConversation = state.messages.find(
        conversation => conversation.id === action.data.conversationId
      );

      messages = state.messages.filter(conversation => !latestConversation || latestConversation.id !== conversation.id);

      if (latestConversation) {
        const newMessage = {
          created_at: action.data.created_at,
          id: action.data.id,
          message: action.data.message
        };

        latestConversation.last_message = latestConversation.last_message
          ? {...latestConversation.last_message, ...newMessage}
          : newMessage;

        messages.unshift(latestConversation);
      }

      return {...state, messages};

    default:
      return state;
  }
};

export default messengerReducer;
