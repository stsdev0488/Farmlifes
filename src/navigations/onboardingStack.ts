import { createStackNavigator } from 'react-navigation-stack';

// Onboarding Screens
import ZipCode from '_screens/Onboarding/ZipCode';
import PasswordReg from '_screens/Onboarding/PasswordReg';
import NameReg from '_screens/Onboarding/NameReg';
import EmailReg from '_screens/Onboarding/EmailReg';
import FinishReg from '_screens/Onboarding/FinishReg';
import DOBReg from '_screens/Onboarding/DOBReg';
import ForgotPassword from '_screens/ForgotPassword';
import Login from '_screens/Login';

import { isAndroid  } from '_services/helpers';



const OnboardingStack = createStackNavigator(
  {
    ZipCode: {
      screen: ZipCode,
      navigationOptions: {
        header: null,
      },
    },
     PasswordReg: {
      screen: PasswordReg,
      navigationOptions: {
        header: isAndroid ? null: undefined ,
        headerForceInset:{ top: 0 }
      },
    },
    NameReg: {
      screen: NameReg,
      navigationOptions: {
       header: isAndroid ? null: undefined , 
       headerForceInset:{ top: 0 }
      },
    },
    EmailReg: {
      screen: EmailReg,
      navigationOptions: {
        header: isAndroid ? null: undefined ,
        headerForceInset:{ top: 0 }
      },
    },
    FinishReg: {
      screen: FinishReg,
      navigationOptions: {
        header: null,
      },
    },
    DOBReg: {
      screen: DOBReg,
      navigationOptions: {
        header: isAndroid ? null: undefined ,
        headerForceInset:{ top: 0 }
      },
    },

    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: isAndroid ? null: undefined ,
        headerForceInset:{ top: 0 }
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    }
  },
  {
     initialRouteName: 'Login', 
  },
);

export default OnboardingStack;