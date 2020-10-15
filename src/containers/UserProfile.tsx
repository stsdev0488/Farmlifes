import React, {useEffect, useState} from 'react';
import UserProfile from '_components/UserProfile';
import NavigationService from '_services/navigationService';
import {followUser, getConversationBetweenUsers, getProfileUser, unfollowUser} from "../actions/profile";
import { getConversationBtwPeople } from '../actions/messenger';
import { useDispatch, useSelector } from 'react-redux';


export default ({ props }) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const userInfo = useSelector(({ user }) => user);

  let userId = props.navigation.getParam('userId');
  let user = props.navigation.getParam('user');

  if (user && !userId) {
    userId = user.id;
  }

  if (profile.user && profile.user.id === userId) {
    user = profile.user;
  }

  useEffect(() => {
    if (userId) {
      dispatch(getProfileUser(userId));
    }
  }, [ userId ]);

  const goToUserMessages = () => {
    dispatch(getConversationBetweenUsers(
        userInfo.user.user.id,
        userId,
        conversation => {
          NavigationService.navigate('Messenger', {data: conversation});
        },
      ),
    );
  };

  const onFarmTitlePress = () => {
    props.navigation.navigate('FarmProfile', {farmId: user.farm_id});
  };

  const onEditPress = () => {
    props.navigation.navigate('EditUserProfile', {user});
  };

  const follow = () => dispatch(followUser(user && user.id));
  const unfollow = () => dispatch(unfollowUser(user && user.id));

  return (
    <UserProfile
      props={props}
      user={user}
      loading={profile.loading}
      onSendMessagePress={goToUserMessages}
      isFollowing={profile.isFollowing}
      isFollowLoading={profile.isFollowLoading}
      follow={follow}
      unfollow={unfollow}
      onFarmTitlePress={onFarmTitlePress}
      loadingConversation={profile.loadingConversation}
      onEditPress={onEditPress}
    />
  );
};
