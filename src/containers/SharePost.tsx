import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { sharePost } from '../actions/feeds';
import SharePost from '_components/SharePost';

export default ({ props }) => {
  const id = props.navigation.state.params.id;

  const feeds = useSelector(({ feeds }) => feeds);
  const singlePost = useSelector(({ notifications }) => notifications.singlePost);

  const feedInfo =
    singlePost && singlePost.id === id
      ? singlePost
      : feeds.feeds.find(post => post.id === id);

  const userInfo = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const loading = feeds.loading;

  const [publisher, onChangePublisher] = useState('human');
  const [postText, onChangePostText] = useState('');

  const [typeOfPost, onChangeTypeOfPost] = useState('post');
  const [shift, onShiftChanged] = useState(false);

  const keyboardDidShow = () => {
    onShiftChanged(true);
  };

  const keyboardHide = () => {
    onShiftChanged(false);
  };

  useEffect(() =>{
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', keyboardHide);
  }, []);

  const onShare = async () => {
    // if (postText.length < 1) {
    //   return alert('Post can\'t be empty')
    // }

    const reqData = {
      id: feedInfo.id,
      text: postText,
      type: typeOfPost,
    };
    dispatch(sharePost(reqData));
  };

  const state = {
    postText,
    onChangePostText,

    typeOfPost,
    onChangeTypeOfPost,

    onShare,

    publisher,
    onChangePublisher,

    loading,
    shift,
  };

  return (
    <SharePost
      props={props}
      feed={feedInfo}
      state={state}
      userInfo={userInfo.user}
    />
  );
};
