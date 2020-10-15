import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Button } from 'native-base';

import navigationService from '_services/navigationService';
import color from '_config/colors';
import styles from './styles';

const HeaderComp = ({props, closeDrawer}) => {
  return (
    <Header
      style={styles.container}
      androidStatusBarColor={color.white}
      barStyle="dark-content"
      iosBarStyle="dark-content"
    >
      <Left>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('Feeds');
            closeDrawer && closeDrawer();
        }}>
          <Image
            style={styles.imageStyle}
            source={require('../../assets/farmlifes_Logo.png')}
          />
        </TouchableOpacity>
      </Left>
      <Right>
        <Button
          transparent
          onPress={() => navigationService.navigate('Search')}
        >
          <Image
            style={styles.icon}
            source={require('../../assets/headerIcons/search.png')} />
        </Button>
        <Button
          transparent
          onPress={() => navigationService.navigate('MessengerListing')}
        >
          <Image
            style={styles.icon}
            source={require('../../assets/headerIcons/inbox.png')}
          />
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderComp;
