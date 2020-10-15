import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessengerListing from '_components/MessengerListing';

import NavigationService from '_services/navigationService';

import { setConversationToSeen } from '_services/api';

import {
  getConversations,
  getFarmConversations,
  updateMessageViewedStatus
} from '../actions/messenger';

import { removeDuplicatesFromArray } from '_services/helpers';
import {NavigationEvents} from 'react-navigation';


export default ({ props }) => {

  const dispatch = useDispatch();
  const messenger = useSelector(({ messenger }) => messenger);
  const userInfo = useSelector(({ user }) => user);

  const [publisher, onChangePublisher] = useState('human');

  const loadData = async () => {
    if (userInfo.user.user.farm_id !== null) {
      await dispatch(getFarmConversations(userInfo.user.user.farm_id));
      dispatch(getConversations(null));
    } else {
      dispatch(getConversations(null));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const goToMessage = (data) => {
    console.info('go to message');
    let reqData = {conversationId: data.id}
    if (publisher !== 'human') {
      reqData.farmId = userInfo.user.user.farm_id;
    }
    console.info('go to message2');

    // Update Message seen status
    setConversationToSeen(reqData);

    console.info('go to message 3');

    dispatch(updateMessageViewedStatus(data.id));
    console.info('navigating to messenger');
    return NavigationService.navigate('Messenger', { data, publisher });
  };

  const state = {
    publisher,
    onChangePublisher,
  };

  let messages = messenger && messenger.messages || [];
  if (messages === undefined) {
    messages = [];
  }

  if (publisher !== 'human') {
    messages = messages.filter(c => c && c.farm === true);
  } else {
    messages = messages.filter(c => c && c.farm !== true);
  }
  return (
    <>
      <NavigationEvents onWillFocus={loadData} />
      <MessengerListing
        userInfo={userInfo.user.user}
        messages={messages.filter(c => c !== undefined)}
        props={props}
        publisher={publisher}
        state={state}
        loading={messenger && messenger.loading}
        goToMessage={goToMessage}
        onRefresh={loadData}
      />
    </>
  );
};
