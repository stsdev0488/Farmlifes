import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { height, width } = Dimensions.get('window');



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.stainedWhite,
    paddingHorizontal: 19,
    paddingTop: 68,
    paddingBottom: 10,
  },
  firstView: {
    alignItems: 'center'
  },
  innerFirstViewText: {
    fontSize: 25,
  },
  innerSecondView: {
    paddingVertical: 17
  },
  innerSecondViewText: {
    fontSize: 19,
  },
  inputContainerStyle: {
    height: height / 16.3,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  errorInputContainerStyle: {
    borderWidth: 2,
    borderColor: colors.errorColor
  },
  errorInputTextStyle: {
    height: height / 20,
  },
  errorInputStyle: {
    paddingTop: 20,
  },
  bottomErrorContainer: {
    width: '101.2%',
    paddingVertical: 5,
    justifyContent: 'center',
    backgroundColor: colors.errorColor,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  bottomErrorText: {
    color: colors.white,
    fontSize: 10,
    textAlign: 'center'
  },
  inputStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0,
    width: '100%',
    // width: width / 3,
    height: height / 13.5,
    paddingHorizontal: 4,
    textAlign: 'center',
  },
  inputTextStyle: {
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 3,
    width: '100%',
    // width: width / 3,
    letterSpacing: 2,
    paddingVertical: 10,
  },
  thirdView: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 30,
  },
  thirdViewText: {
    fontWeight: '800',
    fontSize: 12,
  },
});

export default styles;
