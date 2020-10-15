import React from 'react';
import NavigationService from '_services/navigationService';
import extStyles from '_utils/styles';
import styles from './styles';
import {View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';


export default ({ props }) => {
  const userInfo = useSelector(({user}) => user);

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => NavigationService.navigate('Feeds')}
          >
            <Image
              style={extStyles.bottomTabIconSize}
              source={require('../../assets/bottomTabImages/home.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => NavigationService.push('UserProfile', {user: userInfo.user.user})}
          >
            <Image
              style={extStyles.bottomTabIconSize}
              source={require('../../assets/bottomTabImages/user.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.centerContainer}>
          {
            /* <LinearGradient
                  colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                  start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                  style={styles.middleContainer}
                >
            */
          }
            <TouchableOpacity
              style={styles.middleContainer}
              onPress={() => NavigationService.navigate('CreatePost', { openCamera: true })}
            >
              <Image
                style={extStyles.bottomTabIconSize}
                source={require('../../assets/bottomTabImages/camera.png')} />
            </TouchableOpacity>
          { /* </LinearGradient> */ }
        </View>

        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => NavigationService.navigate('Notifications')}
          >
            <Image
              style={extStyles.bottomTabIconSize}
              source={require('../../assets/bottomTabImages/notification.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <Image
              style={extStyles.bottomTabIconSize}
              source={require('../../assets/bottomTabImages/harmburger.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
