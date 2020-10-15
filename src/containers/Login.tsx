import React, { useState,useEffect } from 'react';
import { Keyboard,Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import AsyncStorage from '@react-native-community/async-storage';
import { login } from '../actions/user';



import Login from '_components/Login/LoginView';

import NavigationService from '_services/navigationService';

import { loginValidation } from '_services/helpers';
import {showMessage} from "react-native-flash-message";

interface LoginProps {
  goToRegister: () => void;
}


// Refactor
export default ({ onRegister }): React.FC<LoginProps> => {

  const dispatch = useDispatch();
  const [email, onEmailChanged] = useState('');
  const [emailError, setEmailError] = useState({
    status: false,
    emailErrorMessage: '',
  });
  const [shift, onShiftChanged] = useState(false);
  const [password, onPasswordChanged] = useState('');
  const [passwordError, setPasswordError] = useState({
    status: false,
    passwordErrorMessage: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // we use the loading from the state
  const loading: boolean = useSelector(state => state.user.loading);

  let keyboardDidShowSub;
  let keyboardDidHideSub;



  handleLogin = () => {
    try {
      AsyncStorage.setItem('email', email);
      // Validate email and password field
      const validate = loginValidation(email,password);
      if (validate.status){
        setPasswordError({
          status: validate && validate.passwordError && validate.passwordError.status,
          errorMessage: validate && validate.passwordError && validate.passwordError.message,
        });
      return setEmailError({
        status: validate && validate.emailError && validate.emailError.status,
        errorMessage: validate && validate.emailError && validate.emailError.message,
        });
      }

      Keyboard.dismiss();
      dispatch(login(email, password));
    } catch (err) {
      showMessage({
        message: err.message,
        description: 'Error, please try again',
        type: 'danger',
        hideOnPress: true,
      });
    }
  };

  // handleKeyboardDidShow = ()

  useEffect(() => {
    const prepopulateEmail = async () => {
      try {
        const data = await AsyncStorage.getItem('email')
        onEmailChanged(data);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', keyboardHide);


    prepopulateEmail();
  }, [])

  keyboardDidShow = () => {
    onShiftChanged(true)
  }

  keyboardHide = () => {
    onShiftChanged(false)
  }

  goToForgotPassword = () => {
    Linking.openURL('https://farmlifes.com/forgot').catch((err) => console.error('An error occurred', err));
  };

  // Create a container object for all global state
  const state = {
    onEmailChanged,
    emailError,
    email,
    setEmailError,
    loading,
    onPasswordChanged,
    passwordError,
    password,
    setPasswordError,
    passwordVisibility,
    setPasswordVisibility,
    goToForgotPassword,
    shift,
  };



  return (
    <Login
      handleLogin={handleLogin}
      state= {state}
      goToRegister={goToRegister}
    />
  )
};
