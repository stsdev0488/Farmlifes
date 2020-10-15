import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  afterHeader: {
    height: 27,
    justifyContent: 'center',
    backgroundColor: colors.stainedWhite,
    borderColor: colors.lightBrown,
    borderWidth: 1,
  },
  afterHeaderText: {
    color: colors.darkBrown,
    fontSize: 12,
    left: 23,
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '200',
  },
  flatlistContainer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
  },
  spinner: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  footerSpinner: {
    flex: 0,
    height: height / 7,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flexGrow: 1,
    // paddingBottom: 4,
  },
  noSuggestionView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default styles;