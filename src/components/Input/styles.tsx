import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    height: height / 16.3,
    flexDirection: 'row',
  },
  text: {
    borderRadius: 6,
    backgroundColor: colors.white,
    flex: 1,
    color: colors.lightBrown,
    paddingHorizontal: 25,
    fontSize: 15,
    fontFamily: 'SourceSansPro-Semibold',
    borderColor: colors.stainedWhite,
    borderWidth: 1,
  },
  placeHolderStyle: {
    borderRadius: 3,
    backgroundColor: colors.white,
    flex: 1,
    color: colors.lightBrown,
    paddingHorizontal: 25,
    fontFamily: 'SourceSansPro-Semibold',
    color: 'red',
    fontWeight: '100'
  },
  viewInImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    position: 'absolute',
    right: 10,
  },
  sideImageStyle: {
    position: 'absolute',
    right: 10,
    top: 25,
  },
  sideImageStyle2: {
    position: 'absolute',
    left: 10,
    top: 15,
  },
  column: {
    flexDirection: 'column',
  },
  errorInputContainerStyle: {
    borderWidth: 2,
    borderColor: colors.errorColor,
    backgroundColor: colors.errorColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  mainErrorContainer: {
    backgroundColor: colors.errorColor,
    width: '100%',
    borderWidth: 0,
    borderColor: colors.errorColor,
  },
  errorTextCont: {
    borderRadius: 4,
    borderColor: colors.errorColor,
    borderWidth: 1,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    paddingTop: 2,
  },
  errorContainer: {
    height: height / 40,
    width: '101%',
    backgroundColor: colors.errorColor,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
