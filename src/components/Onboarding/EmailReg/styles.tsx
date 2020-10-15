import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.stainedWhite,
    paddingHorizontal: 25,
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
  pv10: {
    paddingVertical: 10,
  },
  button: {
    borderColor: colors.lightBrown,
    borderWidth: 1,
  },
  textDescriptionView: {
    alignItems: 'center',
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  textDescription: {
    fontSize: 12,
    textAlign: 'center'
  },
});

export default styles;
