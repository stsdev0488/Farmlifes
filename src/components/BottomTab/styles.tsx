import { StyleSheet,Dimensions } from 'react-native';
import colors from '_config/colors';

import {isAndroid} from '_services/helpers'

const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
  },
  bottomContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: height / 14.9,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  middleContainer: {
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // width: isAndroid ? width / 5.95 : 68.79,
    // height: isAndroid ? height / 10.721 : 68.79,
    // borderRadius: (width / 5.95) /2,

    width: 68.79,
    height: 68.79,
    borderRadius: 34,

    borderWidth: 2.5,
    backgroundColor: colors.white,
    borderColor: colors.lightGreen,
  },
  innerContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerContainer: {
    justifyContent: 'center',
  }
});

export default styles;
