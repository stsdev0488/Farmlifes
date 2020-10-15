import React from 'react';
import {StyleSheet} from 'react-native';
import colors from "../../config/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  inputContainer: {
    height: 40,
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
  dateOfBirthDateInputContainer: {
    flex: 3,
  },
  dateOfBirthMonthInputContainer: {
    flex: 3,
    marginHorizontal: 20,
  },
  dateOfBirthYearInputContainer: {
    flex: 4,
  },
  dateOfBirthInput: {
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 0,
  },
  dateOfBirthInputContainer: {
    height: 35,
  },
  descriptionInputContainer: {
    paddingTop: 20,
  },
  descriptionInputInputContainer: {
    height: 120,
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
  addressInputContainer: {
    marginTop: 20,
    zIndex: 999,
  },
  emailConfirmationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  confirmEmailButton: {
    backgroundColor: colors.darkGray,
  },
  confirmEmailButtonText: {
    color: colors.errorColorDark,
    fontSize: 18,
  },
  emailErrorText: {
    color: colors.errorColorDark,
  },
  passwordInputContainer: {
    marginTop: 15,
    flex: 1,
  },
  passwordInputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  checkBoxContainer: {
    color: colors.thickGreen,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.lightBrown,
    left: 0,
  },
  checkBoxInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  checkBoxLabel: {
    fontFamily: 'SourceSansPro-Regular',
    color: colors.lightBrown,
    fontSize: 13,
    marginLeft: 3,
  },
  activeCheckBox: {
    borderColor: colors.thickGreen,
  },
});
