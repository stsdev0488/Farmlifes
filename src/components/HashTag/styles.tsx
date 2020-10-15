import { StyleSheet } from 'react-native';
import colors from '_config/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
  },
  flex0: {
    flex: 0
  },
  flex1: {
    flex: 1
  },
  postContainer: {
    borderTopColor: colors.stainedWhite
  }
});
export default styles;