import { StyleSheet } from 'react-native';
import colors from '_config/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.blurredWhite
  },
  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  longText: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.black,
    fontSize: 17,
    textAlign: 'center',
  },
  headerSubTitle: {
    color: colors.lightBlack,
    fontSize: 14,
    textAlign: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default styles;
