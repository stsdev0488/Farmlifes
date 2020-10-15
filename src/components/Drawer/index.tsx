import React from 'react';

import {NavigationActions} from 'react-navigation';
import {
  ScrollView,
  SafeAreaView,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Text from '_components/Text';
import Header from '_components/Header';
import styles from './styles';
import extStyles from '_utils/styles';
import navigationService from '_services/navigationService';
import Button from '../../components/Button';
import {strings} from '_utils/i18n';
import user from '../../reducers/user';

const getPicture = name => {
  switch (name) {
    case 'Marketplace':
      return require('../../assets/drawerImages/marketplace.png');
    case 'Map of Farms':
      return require('../../assets/drawerImages/mapOfFarm.png');
    case 'VideosEmpt':
      return require('../../assets/drawerImages/video.png');
    case 'ForumEmpt':
      return require('../../assets/drawerImages/forum.png');
    case 'HelpEmpt':
      return require('../../assets/drawerImages/help.png');
    case 'Informations':
      return require('../../assets/drawerImages/informations.png');
    case 'Settings':
      return require('../../assets/drawerImages/settings.png');
    default:
      return require('../../assets/drawerImages/mapOfFarm.png');
  }
};

const navigateTo = (navigation, screen) => {
  navigation.dispatch(NavigationActions.navigate({routeName: screen}));
};

const getFunctionToCall = (props, routeName) => {
  switch (routeName) {
    case 'HelpEmpt':
      return () => {
        props.navigation.toggleDrawer();
        navigationService.navigate('Help');
      };
    case 'ForumEmpt':
      return () => {
        props.navigation.toggleDrawer();
        navigationService.navigate('Forum');
      };
    case 'VideosEmpt':
      return () => {
        props.navigation.toggleDrawer();
        navigationService.navigate('Video');
      };
    case 'Marketplace':
      return () =>
        Linking.openURL('https://farmlifes.com/marketplace').catch(err =>
          console.error('An error occurred', err),
        );
    case 'Informations':
      return () =>
        Linking.openURL('https://info.farmlifes.com/').catch(err =>
          console.error('An error occurred', err),
        );
    default:
      return () => routeTo(routeName);
  }
};

const getDisplayRouteName = routeName => {
  switch (routeName) {
    case 'HelpEmpt':
      return strings('Drawer.help');
    case 'ForumEmpt':
      return strings('Drawer.forum');
    case 'VideosEmpt':
      return strings('Drawer.video');
    case 'Map of Farms':
      return strings('Drawer.mapOfFarms');

    default:
      return strings(`Drawer.${routeName.toLowerCase()}`);
  }
};

export default ({props, routeTo, userInfo, logOut, closeDrawer}) => {
  const {items, activeItemKey} = props;

  const user = userInfo && userInfo.user && userInfo.user.user;

  return (
    <ScrollView style={styles.drawer}>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <Header closeDrawer={closeDrawer} />
        <TouchableOpacity
          style={styles.contentContainer}
          onPress={() => {
            navigationService.push('UserProfile', {user: userInfo.user.user});
            closeDrawer();
          }}>
          <View style={styles.imageView}>
            <Image
              style={styles.images}
              source={
                user && user.avatar
                  ? {uri: user.avatar}
                  : require('../../assets/placeholders/profile_picture.png')
              }
            />
          </View>
          <View style={styles.innerView}>
            <Text style={styles.textStyle}>{user && user.name}</Text>
            <Text style={styles.smallText}>
              {strings('Drawer.viewProfile')}
            </Text>
          </View>
        </TouchableOpacity>

        {user && user.farm ? (
          <TouchableOpacity
            style={styles.contentContainer}
            onPress={() => {
              navigationService.navigate('FarmProfile', {
                farmId: userInfo.user.user.farm.id,
              });
              closeDrawer();
            }}>
            <View style={styles.imageView}>
              <Image
                style={styles.images}
                source={
                  user.farm.avatar && user.farm.avatar !== ''
                    ? {uri: user.farm.avatar}
                    : require('../../assets/placeholders/profile_picture.png')
                }
              />
            </View>
            <View style={styles.innerView}>
              <Text style={styles.textStyle}>{user.farm.name}</Text>
              <Text style={styles.smallText}>
                {strings('Drawer.viewProfile')}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.contentContainer,
              {justifyContent: 'space-between'},
            ]}>
            <View style={{flex: 1, marginRight: 10}}>
              <Button
                text={strings('Drawer.createFarmProfile')}
                style={styles.button}
                fontStyle={styles.buttonFont}
                fn={() => {
                  navigationService.navigate('EditFarmProfile');
                  closeDrawer();
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                text={strings('Drawer.farmMembership')}
                style={styles.button}
                fontStyle={styles.buttonFont}
                fn={() => {
                  navigationService.navigate('Search', {joinFarm: true});
                  closeDrawer();
                }}
              />
            </View>
          </View>
        )}
        {items
          .filter(route => route.routeName !== 'Dashboard')
          .map(route => {
            const section = null;
            return (
              <TouchableOpacity
                onPress={() => {
                  getFunctionToCall(props, route.routeName)();
                  closeDrawer();
                }}
                style={styles.contentContainer}
                key={route.key}>
                {section}
                <View style={styles.imageView}>
                  <Image
                    style={[extStyles.otherDrawerMenu]}
                    source={getPicture(route.routeName)}
                  />
                </View>
                <View style={styles.innerView}>
                  <Text style={styles.textStyle} key={`text-${route.key}`}>
                    {getDisplayRouteName(route.routeName)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        <View style={styles.logOutView}>
          <View style={styles.imageView} />
          <View style={styles.innerView}>
            <Text style={styles.textStyle} onPress={logOut}>
              {strings('Drawer.logout')}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
