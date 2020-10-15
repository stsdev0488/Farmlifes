import {  Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

import color from '_config/colors';

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor:  color.errorColor,
    height: height / 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
  },
  offlineText: {
    color: color.white
  },
});

export default styles;

