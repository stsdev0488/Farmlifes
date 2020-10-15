import { StyleSheet, Dimensions } from 'react-native';

import colors from '_config/colors';
const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    height: height /7,
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal:20,
  },
  imageView: {
    flex: 1,
  },
  imageStyle: {
    height: height / 8.19,
    width: height / 8.19,
    resizeMode: 'contain'
  },
  otherView: {
    height: height / 8.19,
    width: height / 8.19,

    flex: 2,
    justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 18,
    marginLeft: -10,
  },
  innerView: {
    paddingLeft: 5,
    paddingBottom: 3,
  },
  innerViewText: {
    fontSize: 12,
    color: colors.darkBrown,
  },
  buttonViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstButton: {
    width: width / 3.5,
    height: 30,
    borderRadius: 3,
    backgroundColor: colors.lightGreen
  },
  firstButtonText: {
    color: colors.white,
  },
  secondButton:{
    width: width /3.5,
    height: 30,
    borderRadius: 3,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.stainedWhite
  },
  subscribedButton: {
    width: width / 3.8,
    height: 30,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.lightGreen
  },
  subscribedButtonText: {
    fontSize: 10,
    color: colors.lightGreen,
  },
});

export default styles;
