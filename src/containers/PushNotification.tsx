import React, {Component} from 'react';

import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
import {ONE_SIGNAL_ID} from '_config/constants';
import {setDeviceInfo} from '_actions/user';
import {handleNotificationReceived, handleNotificationOpened} from '../services/pushNotifications';



class App extends Component {
  constructor(properties) {
    super(properties);
    console.info('initializing onesignal', ONE_SIGNAL_ID);
    OneSignal.init(ONE_SIGNAL_ID, {
      kOSSettingsKeyAutoPrompt: true,
    });

    // Disable the default alert in order to display a custom alert
    // https://documentation.onesignal.com/docs/react-native-sdk#section-set-alert-focus-behavior
    OneSignal.inFocusDisplaying(2);


    console.info('adding event listener to onesignal');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);

    OneSignal.addEventListener('ids', this.onIds);
    // OneSignal.addEventListener('ids', this.onIds.bind.this());
  }

  onReceived = (notification) => {
    handleNotificationReceived(notification, this.props.navigation);
    console.log("Notification received: ", notification);
  }

  onOpened = (openResult) => {
    console.info('notification opened', openResult);
    handleNotificationOpened(openResult.notification, this.props.navigation);
  }

  onIds = (device) => {
    this.props.updateDeviceData(device);
  };

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = dispatch => ({
  updateDeviceData: device => dispatch(setDeviceInfo(device)),
});
export default connect(
  null,
  mapDispatchToProps,
)(App);
