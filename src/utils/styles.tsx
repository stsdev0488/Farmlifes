import { StyleSheet } from 'react-native';
import colors from '_config/colors';

const styles = StyleSheet.create({
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },
  flex7: {
    flex: 7,
  },
  flex8: {
    flex: 8,
  },
  bottomTabIconSize: {
    height: 25,
    resizeMode: 'contain',
    width: 25
  },
  drawerMenuIconSize: {
    height: 40,
    resizeMode: 'contain',
    width: 40,
    // borderWidth: 20,
    borderRadius: 20,
  },
  otherDrawerMenu: {
    height: 40,
    resizeMode: 'contain',
    width: 40,
  },

  br10: {
    borderRadius: 10,
    // width: 45,
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  f1row: {
    flex: 1,
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeFontSize: {
    fontSize: 25,
  },
  ft15: {
    fontSize: 15,
  },
  flexGrow: {
    flexGrow: 1,
  },
  jcnac: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  jc: {
    justifyContent: 'center',
  },
  taC: {
    textAlign: 'center'
  },
  aic: {
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray
  }
});

export default styles;