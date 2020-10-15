import { StyleSheet,Dimensions } from 'react-native';

import colors from '_config/colors';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageView: {
    height: height / 2.5,
    width,
    backgroundColor: colors.stainedWhite,
  },
  icon: {
    // width: 30,
    // height: 30,
    // borderRadius: 15
  },
  deleteView: {
    backgroundColor:'red',
    position: 'absolute',
    height:30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    right: 20,
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  }
});

export default styles;
