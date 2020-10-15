import React, { Component } from 'react';
import AuthLoading from '_containers/AuthLoading';

import OneSignal from 'react-native-onesignal';


export default (props) => {

  goToHome = async() => {
    OneSignal.registerForPushNotifications();
    props.navigation.navigate('App');
  }
  
  goToLogin = () => {
    props.navigation.navigate('Login');
  }

  return <AuthLoading goToLogin={goToLogin}  goToHome={goToHome}/>
};
