import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 44,
    position: 'absolute',
    bottom: 15,
    // bottom: -150,
    width,
    flex: 1,
  },
  shiftKeyboard: {
    bottom: -100
  },
  containerView: {
    paddingTop: 10,
    flexDirection: 'row',
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBottomView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontalLine: {
    flex: 4,
    alignItems: 'center',
    borderBottomColor: colors.lightBrown,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 12,
  },
  button: {
    backgroundColor: colors.lightGreen,
  },
  buttonText: {
    fontSize: 15,
    color: colors.white,
  },
});

export default styles;
