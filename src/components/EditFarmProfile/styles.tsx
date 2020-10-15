import React from 'react';
import colors from '../../config/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
  inputContainer: {
    height: 45,
  },
  nameInputsContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  prenameInputContainer: {
    flex: 1,
  },
  surnameInputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  dateOfBirthContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dateOfBirthTextContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
  },
  dateOfBirthInputsContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  categorySelectInputContainer: {
    flex: 2,
  },
  areaInputContainer: {
    flex: 1,
    marginRight: 20,
  },
  membersInputContainer: {
    flex: 1,
  },
  dateOfBirthInput: {
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 0,
  },
  dateOfBirthInputContainer: {
    height: 45,
  },
  descriptionInputContainer: {
    zIndex: 1,
    marginBottom: 40,
  },
  descriptionInputInputContainer: {
    height: 200,
    padding: 0,
  },
  descriptionInputTextStyle: {
    padding: 0,
  },
  genderCheckboxContainer: {
    flexDirection: 'row',
  },
  genderCheckboxText: {
    marginLeft: 15,
  },
  selectInput: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.stainedWhite,
    borderRadius: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: 'center',
  },
  selectInputIcon: {
    paddingRight: 10,
    paddingTop: 15,
  },
  addressInputContainer: {
    marginTop: 20,
    zIndex: 999,
    marginBottom: 20,
  },
});
