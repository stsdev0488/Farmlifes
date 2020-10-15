import {createStackNavigator} from 'react-navigation-stack';

// Dashboard Screens
import Home from '_screens/Home';

import FindPeople from '_screens/FindPeople';
import CreatePost from '_screens/CreatePost';
import SharePost from '_screens/SharePost';

import Help from '_screens/Help';

import Forum from '_screens/Forum';

import MessengerListing from '_screens/MessengerListing';

import Video from '_screens/Video';

import HashTag from '_screens/HashTag';

import Messenger from '_screens/Messenger';


const MainStack = createStackNavigator(
  {
    MessengerListing: {
      screen: MessengerListing,
      navigationOptions: {
        header: null,
      },
    },
    FindPeople: {
      screen: FindPeople,
      navigationOptions: {
        header: null,
      },
    },
    Help: {
      screen: Help,
      navigationOptions: {
        header: null,
      },
    },
    Forum: {
      screen: Forum,
      navigationOptions: {
        header: null,
      },
    },

    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    Video: {
      screen: Video,
      navigationOptions: {
        header: null,
      },
    },
    HashTag: {
      screen: HashTag,
      navigationOptions: {
        header: null,
      },
    },
    Messenger: {
      screen: Messenger,
      navigationOptions: {
        header: null,
      },
    },
    CreatePost: {
      screen: CreatePost,
      navigationOptions: {
        header: null,
      },
    },
    SharePost: {
      screen: SharePost,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    // initialRouteName: 'MessengerListing',
    initialRouteName: 'Feeds',
  },
);

export default MainStack;
