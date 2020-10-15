import React from 'react';
import { View, Image } from 'react-native';
import Spinner from '_components/Spinner';

import styles from './styles';

const AuthLoading = () => (
  <View style={styles.container}>
    <Image
      source={require('../../assets/splash_screen.png')}
      style={styles.image}
      resizeMode="cover"
    />
  </View>
);

export default AuthLoading;
