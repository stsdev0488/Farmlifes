import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { height } = Dimensions.get('window');

import color from '_config/colors';

import { isAndroid } from '_services/helpers';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  container2: {
    // backgroundColor: color.white,
    flexDirection: 'row',
    width,
    alignItems: 'center',
    borderTopColor: color.stainedWhite,
    borderTopWidth: 1,
    paddingHorizontal: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  inputView: {
    width: '75%',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  commentImage: {
    left: -10,
    top: -10,
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  input: {
    left: 10,
    width: '90%',
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: color.lightBrown,
    borderRadius: 40,
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textStyle: {
    paddingTop: !isAndroid ? 10 : undefined,
    fontSize: 20,
  },
});

export default styles;
