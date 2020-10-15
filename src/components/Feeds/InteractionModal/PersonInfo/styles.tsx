import { StyleSheet } from 'react-native';
import color from '_config/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color.stainedWhite,
    // resizeMode: 'contain'
  },
  text: {
    left: 10,
    fontSize: 15,
    color: color.lightBrown
  }
});

export default styles;
