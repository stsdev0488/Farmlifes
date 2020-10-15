import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import colors from '_config/colors';

const { width } = Dimensions.get('window');

const styles =StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    position: 'absolute',
    bottom: 15,
    width,
  },
  innerBottomView: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  horizontalLine: {
    height: 50,
    borderBottomColor: colors.lightBrown,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 12,
  },
  shiftKeyboard: {
    bottom: -100
  },
});

export default styles;
