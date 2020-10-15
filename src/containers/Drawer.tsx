import React from 'react';
import Drawer from '_components/Drawer';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../actions/user';
import {cancelPushNotification} from '../services/api';

export default (props: any): React.FC => {
  const dispatch = useDispatch();
  const userInfo = useSelector(({user}) => user);

  const deviceId = userInfo && userInfo.deviceInfo && userInfo.deviceInfo.userId;

  routeTo = (route) => {
    props.navigation.toggleDrawer();
  };

  handleLogout = () => { // name event-handler handleXY
    cancelPushNotification({ onesignal_player_id: deviceId })
    dispatch(logout());
    props.navigation.navigate('Onboarding');
  };

  return <Drawer
    closeDrawer={props.navigation.closeDrawer}
    props={props}
    userInfo={userInfo}
    routeTo={routeTo}
    logOut={handleLogout} />
};
