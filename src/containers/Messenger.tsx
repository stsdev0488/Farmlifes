import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { updateMessageLastSent } from '_actions/messenger';

import Spinner from '_components/Spinner';
import Messenger from '_components/Messenger';

import {getConverationBetweenPeople, sendMessage} from '_services/api';

import extStyles from '_utils/styles';
import uniqBy from 'lodash/uniqBy';

const defaultUserAvatar = require('../assets/placeholders/profile_picture.png');

export default ({ props }) => {
  const dispatch = useDispatch();

  const [text, onChangeText] = useState('');
  const [loading, onChangeLoading] = useState(true);

  const [messages, onChangeMessages] = useState([]);
  const [page, onChangePage] = useState(1);

  const [loadMore, onChangeLoadMore] = useState(true);

  const userInfo = useSelector(({ user }) => user);

  const data = props.navigation.getParam('data');
  const publisher = props.navigation.getParam('publisher') || 'human';
  const isFarm = publisher !== 'human';
  const senderId = isFarm ? userInfo.user.user.farm_id : userInfo.user.user.id;

  const id = data.id;

  const receiverInfo = data.participants.find(c => c.id !== senderId);
  const senderInfo = data.participants.find(c => c.id === senderId);

  const onSend = (newMessages: T[] = []) => {
    console.info('new messages', newMessages);
    if (newMessages[0].text === '') {
      return;
    }

    onChangeText('');

    newMessages[0].sender = {};
    newMessages[0]._id = Date.now();
    newMessages[0].local_id = newMessages[0]._id.toString();
    newMessages[0].avatar = receiverInfo.avatar;
    newMessages[0].name = receiverInfo.name;
    newMessages[0].user._id = userInfo.user.id;
    newMessages[0].user.avatar = userInfo.user.avatar;

    newMessages[0].sender._id = userInfo.user.id;
    newMessages[0].sender.avatar = userInfo.user.avatar;


    onChangeMessages(newMessages.concat(messages))

    const data = {
      conversationId: id,
      created_at: Date.now(),
      id: Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 10),
      message: newMessages[0].text,
    };

    dispatch(updateMessageLastSent(data));
    return sendMessageToApi(newMessages[0].text, newMessages[0]._id.toString());
  };

  const sendMessageToApi = async (text, localId) => {
    try {
      const data = {
        'target_type': receiverInfo.type,
        'target_id': receiverInfo.id,
        'local_id': localId,
        message: text,
      };

      let farmId = null;

      if (publisher === 'farm') {
        farmId = senderId;
      }

      console.info('send message data', data);

      const remoteMessage = await sendMessage(data, farmId);
      console.info('message sent', remoteMessage);
    }
    catch (err) {
      console.log('send message error', err.response)
    }
  }

  const loadIntialContent = async () => {
    try {
      const resp = await getConverationBetweenPeople(
        id,
        1,
        isFarm ? senderId : null,
      );

      const checkNewMessage = messages && messages.every(r => resp.data.data.includes(r))
      if (messages && messages.length === 0 || !checkNewMessage) {
        let theData = resp.data.data.map(c => {

          c.user = {};
          if (c.sender === null) {
            c.sender = {}
          }

          c._id = c.id;
          c.createdAt = c.created_at;
          c.text = c.message;
          c.user._id = c && c.sender && c.sender.id;
          c.user.avatar = c && c.sender && !c.sender.avatar ? defaultUserAvatar : c && c.sender && c.sender.avatar;
          c.sender._id = c && c.sender && c.sender.id;
          c.sender.avatar = c && c.sender && !c.sender.avatar ? defaultUserAvatar : c && c.sender && c.sender.avatar;
          return c;
        });

        const newMessages = uniqBy([...theData, ...messages], 'local_id');
        onChangeMessages(newMessages);
        onChangeLoading(false);
      }
      onChangeLoading(false);
    }
    catch (err) {
      onChangeLoading(false);
      console.log(err.message);
    }
  }

  // Load messages initially
  useEffect(() => {
    loadIntialContent();
  }, []);

  // Load new messages each 3 seconds
  useEffect(() => {
    const getMessages = setInterval(() => {
      loadIntialContent()
    }, 3000);
    return () => clearInterval(getMessages);
  }, [messages]);


  const loadMoreFn = async () => {
    console.info('load more', loadMore);
    if (loadMore) {
      console.info('loading more');
      try {
        onChangePage((page + 1));
        const resp = await getConverationBetweenPeople(
          id,
          page + 1,
          isFarm ? senderId : null,
        );
        console.info('fm resp', resp);
        let theData = resp.data.data.map(c => {

          c.user = {};
          if (c.sender === null) {
            c.sender = {}
          }
          c._id = c.id;
          c.text = c.message;
          c.user._id = c && c.sender && c.sender.id;
          c.user.avatar = c && c.sender && !c.sender.avatar ? defaultUserAvatar : c && c.sender && c.sender.avatar;
          c.sender._id = c && c.sender && c.sender.id;
          c.sender.avatar = c && c.sender && !c.sender.avatar ? defaultUserAvatar : c && c.sender && c.sender.avatar;
          return c;
        });

        if (theData.length === 0) {
          onChangeLoadMore(false);
        } else {
          await onChangeMessages(messages.concat(theData));
        }
      } catch (err) {
        //
      }
    }
  };

  if (loading) {
    return (
      <View style={extStyles.center}>
        <Spinner />
      </View>
    );
  }

  console.info('messages', messages);
  return (
    <Messenger
      loading={loading}
      senderInfo={senderInfo}
      userInfo={receiverInfo}
      userId={id}
      props={props}
      messages={messages || []}
      onSend={onSend}
      loadMoreFn={loadMoreFn}
      loadMore={loadMore}
      text={text}
      onChangeText={onChangeText}
    />
  );
};
