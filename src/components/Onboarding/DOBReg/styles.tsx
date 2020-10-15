import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.stainedWhite,
    paddingHorizontal: 37.25,
    paddingTop: 40,
    paddingBottom: 10,
  },
  firstView: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 25,
  },
  innerFirstViewText1: {
    fontSize: 25
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  datePickerContainer:{
    width: '100%',
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
    borderRadius: 4,
  },
  dateInput: {
    height: height / 16.3,
    borderColor: colors.stainedWhite,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: colors.white,
    marginLeft: 36
  },
  dateText:{
    color: colors.lightBrown,
    fontFamily: 'SourceSansPro-Semibold'
  },
  pv10: {
    paddingVertical: 10,
  },
  textDescriptionView: {
    alignItems: 'center',
    paddingBottom: 25
  },
  textDescription: {
    fontSize: 12
  },
});

export default styles;
