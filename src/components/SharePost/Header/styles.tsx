

import { StyleSheet } from 'react-native';
import colors from '_config/colors';
import { isAndroid } from '_services/helpers'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: !isAndroid ? -30 : null,
  },
  leftContainer: {
    paddingLeft: 5,
    flex: 1,
  },
  rightContent: {
    width: '100%',
    alignItems: 'flex-end',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center'
  },
  center: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  middleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  rightText: {
    right: 8,
    color: colors.lightGreen,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
  },
  leftText: {
    color: colors.lightGreen,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    width: '100%',
  },
  centerText: {
    color: colors.black,
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 15,
    textAlign: 'center',
  },
});
export default styles;
