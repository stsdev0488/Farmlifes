import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.stainedWhite,
    paddingHorizontal: 44,
    paddingTop: 43,
    paddingBottom: 10,
  },
  imageLogo: {
    height: 36,
    resizeMode: 'contain',
    width: width / 2.1,

  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 6,
    paddingVertical: 30,
    width: '100%',
  },
  inputView: {
    paddingVertical: 5
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.lightGreen,
  },
  buttonText: {
    fontSize: 15,
    color: colors.white,
  },
  forgotPasswordView: {
    paddingTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  forgotPasswordText: {
    textDecorationLine: 'underline'
  }
});

export default styles;
 