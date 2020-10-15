import { StyleSheet } from 'react-native';

import color from '_config/colors';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    resizeMode: 'cover'
  },
  container: {
    backgroundColor: color.stainedWhite,
  },
});

export default styles;

