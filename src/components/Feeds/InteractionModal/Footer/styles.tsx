import { Dimensions, StyleSheet } from 'react-native';
import color from '_config/colors';

import { isAndroid } from '_services/helpers';

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flexDirection: 'row',
    width,
    borderTopColor: color.stainedWhite,
    borderTopWidth: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerKeyboard: {
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainerKeyboard: {
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  inputView: {
    width: '75%',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  inputViewKeyboard: {
    // height: 50,
    // height: height / 3.8,
  },
  commentImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  input: {
    left: 10,
    width: '90%',
    borderColor: color.lightBrown,
    paddingLeft: 15,
    paddingTop: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  inputViewKeyboard: {
    height: 50,
  },
  textStyle: {
    fontFamily: 'SourceSansPro-Regular',
    backgroundColor: color.drawerBorderColor,
    borderRadius: 40,
    fontFamily: '',
    paddingTop: !isAndroid ? 10 : null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyleViewKeyboard: {
    textAlignVertical: 'top',
    // borderWidth: 3,
    // borderColor: 'red',
  },
});

export default styles;
