import {createAppContainer, createSwitchNavigator} from 'react-navigation';

// Import Stack
import DrawerNavigator from './drawer';
import OnboardingStack from './onboardingStack';
// import MainStack from './mainStack';

// AuthLoading screens
import AuthLoading from '_screens/AuthLoading';

import Test from './test';

export const AppNavigator = createSwitchNavigator(
  {
    AuthLoading,
    Onboarding: OnboardingStack,
    // MainStack,
    App: DrawerNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export const RootNavigator = createAppContainer(AppNavigator);
