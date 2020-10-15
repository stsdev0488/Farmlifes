import { StyleSheet, Dimensions } from 'react-native';

import color from '_config/colors';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  news: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: color.whiteInCreate,
  },
  newsText: {
    textAlign: 'center',
  },
  spinner: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  footerSpinner: {
    height: height / 5,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  flex0: {
    flex: 0
  },
  flex1:{
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
  },
  pb50: {
    paddingBottom: 50,
  },
  divider: {
    height: 8,
    borderWidth: 1,
    backgroundColor: color.stainedWhite2,
    borderColor: color.stainedWhite,
  },
  addViewContainer: {
    borderBottomColor: color.stainedWhite,
    borderBottomWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
