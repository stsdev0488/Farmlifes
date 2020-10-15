import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.stainedWhite,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 10,
  },
  firstView: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 25,
  },
  innerFirstViewText1: {
    fontSize: 20,
  },
  button: {
    backgroundColor: colors.lightGreen,
  },
  hyperLink:{
    color: colors.blue,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  fontStyle: {
    fontWeight: 'bold',
    color: colors.white,
  },
  textDescriptionView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 35,
  },
  textDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;
