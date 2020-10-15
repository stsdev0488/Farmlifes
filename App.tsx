import React, {Component} from 'react';
import {YellowBox, View, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import ErrorHandler from './src/components/ErrorHandler';
import OfflineNotice from './src/components/OfflineNotice';
import Spinner from './src/components/Spinner';
import StatusBar from './src/components/StatusBar'
import PushNotificationContainer from './src/containers/PushNotification';
import NavigationService from './src/services/navigationService';
import extStyles from './src/utils/styles';
import analytics from '@react-native-firebase/analytics';
import {store, persistor} from './src/store';
import {RootNavigator} from './src/navigations/index';

import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
});


if (__DEV__) {
  YellowBox.ignoreWarnings([
    'Setting a timer',
    'Warning',
    'Remote',
    'componentWillMount',
    'Class RCTCxxModule',
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader', 'Setting a timer for a long period of time',
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746,
  ]);
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}


// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }

  return route.routeName;
}


export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <PersistGate persistor={persistor} Spinner={<Spinner />}>
          <SafeAreaView style={extStyles.safeArea}>
            <ErrorHandler>
              <PushNotificationContainer>
                <StatusBar />
                <RootNavigator
                  ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
                  onNavigationStateChange={(prevState, currentState, action) => {
                    const currentRouteName = getActiveRouteName(currentState);
                    const previousRouteName = getActiveRouteName(prevState);

                    if (previousRouteName !== currentRouteName) {
                      // the line below uses the @react-native-firebase/analytics tracker
                      // change the tracker here to use other Mobile analytics SDK.
                      analytics().setCurrentScreen(currentRouteName, currentRouteName);
                    }
                  }}
                />
                <OfflineNotice />
                <FlashMessage position="bottom" />
              </PushNotificationContainer>
            </ErrorHandler>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    )
  }
}

