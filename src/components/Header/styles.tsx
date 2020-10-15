import { StyleSheet } from 'react-native';
import colors from '_config/colors';
import { isAndroid } from '_services/helpers'

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    backgroundColor: colors.white,
    marginTop: !isAndroid ? -30: null,
  },
  imageStyle: {
    height: 30,
    width: 200,
    resizeMode: 'contain'
  },
  icon: {
    width: 18.94,
    resizeMode: 'contain',
    height: 18.94,
  }
});

export default styles;