import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.stainedWhite,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 10,
  },
  firstView: {
    alignItems: 'center',
    paddingTop: 40,
  },
  innerFirstViewText1: {
    fontSize: 25
  },
  inputContainer: {
    paddingTop: 25,
  },
  secondView: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal:70,
  },
  secondViewText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default styles;