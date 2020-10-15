import { createStackNavigator } from 'react-navigation-stack';



import Help from '_screens/Help';

// import MessengerListing from '_screens/MessengerListing';
// import Messenger from '_screens/Messenger';

const TestStack = createStackNavigator(
  {
    Help: {
      screen: Help,
      navigationOptions: {
        header: null,
      },
    },
    // MessengerListing: {
    //   screen: MessengerListing,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
    //  Messenger: {
    //   screen: Messenger,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
  },
  {
    initialRouteName: 'Help',
  },
);

export default TestStack;