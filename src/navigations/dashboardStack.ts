import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home             from '_screens/Home';
import FindPeople       from '_screens/FindPeople';
import CreatePost       from '_screens/CreatePost';
import SharePost        from '_screens/SharePost';
import Feeds            from '_screens/Feeds';
import Help             from '_screens/Help';
import Forum            from '_screens/Forum';
import MessengerListing from '_screens/MessengerListing';
import Video            from '_screens/Video';
import HashTag          from '_screens/HashTag';
import Messenger        from '_screens/Messenger';
import UserProfile      from '_screens/UserProfile';
import EditUserProfile  from '_screens/EditUserProfile';
import FarmProfile      from '_screens/FarmProfile';
import EditFarmProfile  from '_screens/EditFarmProfile';
import FarmMembers      from '_screens/FarmMembers';
import NewsFeed         from '_screens/NewsFeed';
import Notifications    from '_screens/Notifications';
import SinglePost       from '_screens/SinglePost';
import Search           from '_screens/Search';
import MapScreen        from '../screens/MapScreen';


const DashboardStack = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        header: null,
      },
    },
    Feeds: {
      screen: Feeds,
      navigationOptions: {
        header: null,
      },
    },
    FarmProfile: {
      screen: FarmProfile,
      navigationOptions: {
        header: null,
      },
    },
    EditFarmProfile: {
      screen: EditFarmProfile,
      navigationOptions: {
        header: null,
      },
    },
    FarmMembers: {
      screen: FarmMembers,
      navigationOptions: {
        header: null,
      },
    },

    NewsFeed: {
      screen: NewsFeed,
      navigationOptions: {
        header: null,
      },
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        header: null,
      },
    },

    EditUserProfile: {
      screen: EditUserProfile,
      navigationOptions: {
        header: null,
      },
    },

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
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        header: null,
      },
    },
    SinglePost: {
      screen: SinglePost,
      navigationOptions: {
        header: null,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    // initialRouteName: 'FindPeople',
    initialRouteName: 'Feeds',
  },
);
export default DashboardStack;

// export default createAppContainer(DashboardStack);
