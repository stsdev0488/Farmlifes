import { StyleSheet } from 'react-native';

import colors from '_config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    paddingBottom: 50,
  },
  post: {
    width: '100%',
    borderTopWidth: 10,
    borderTopColor: colors.stainedWhite,
  },
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default styles;
