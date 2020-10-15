import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.stainedWhite,
    paddingHorizontal: 13.63,
    paddingTop: 40,
    paddingBottom: 10,
  },
  firstView: {
    alignItems: 'center',
    paddingTop: 40,
  },
  innerFirstViewText1: {
    fontSize: 25
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  inputViewStyle: {
    width: '49%'
  },
  inputStyle: {
    height: height / 16.3,
  },
  button: {
    justifyContent: 'center',
    paddingHorizontal: 30,
  }
});

export default styles;
