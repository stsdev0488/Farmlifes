import { Dimensions, StyleSheet } from 'react-native';
import colors from '_config/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 3,
    height: height / 18.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
  },
  iconStyle: {
    color: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    top: 3,
    left: -5,
  },
});

export const primaryButtonStyles = StyleSheet.create({
  main: {
    backgroundColor: colors.lightGreen,
  },
  text: {
    fontSize: 15,
    color: colors.white,
  },
});


export default styles;
