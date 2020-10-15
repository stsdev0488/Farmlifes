import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '_screens/Home';

// import Help from '_screens/Help';

import DrawerContainer from '_containers/Drawer';

import DashboardStack from './dashboardStack';

import DD from  './dashboardContainer';

const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: DashboardStack,
    Marketplace: {
      screen: () => {},
    },
    'Map of Farms': {
      screen: Home,
    },
    VideosEmpt: {
      screen: () => {},
    },
    ForumEmpt: {
      screen: () => {},
    },
    HelpEmpt: {
      screen: () => {},
    },
    Informations: {
      screen: () => {},
    },
  },
  {
    drawerWidth: '80%',
    drawerPosition: 'right',
    contentComponent: DrawerContainer,
  },
);

export default DrawerNavigator;
