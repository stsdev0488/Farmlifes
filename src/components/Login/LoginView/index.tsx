import React from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import Button from '_components/Button';
import Text from '_components/Text';
import Input from '_components/Input';
import DismissKeyboard from '_components/DismissKeyboard';
import BottomView from '../LoginBottomView/index';
import { strings } from '_utils/i18n';

import styles from './styles';
import extStyles from '_utils/styles';


interface ErrorInterface {
  status: boolean;
  passwordErrorMessage?: string;
  emailErrorMessage?: string;
}

interface StateProps {
  goToForgotPassword: () => void;

  onEmailChanged: () => void;
  setEmailError: () => void;
  email: string;
  emailError: ErrorInterface;

  onPasswordChanged: () => void;
  passwordError: () => void;
  password: string;
  passwordError: ErrorInterface;

  passwordVisibility: boolean;
  setPasswordVisibility: () => void;

  loading: boolean;
}

interface LoginProps {
  handleLogin: () => void;
  goToRegister: () => void;
  state: StateProps;
}

const Login = ({
  handleLogin,
  goToRegister,
  state: {
    goToForgotPassword,
    onEmailChanged,
    emailError,
    email,
    setEmailError,
    loading,
    password,
    passwordError,
    onPasswordChanged,
    setPasswordError,
    passwordVisibility,
    setPasswordVisibility,
    shift,
  }

}: LoginProps) => {

  return (
    <DismissKeyboard>
      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image
            style={styles.imageLogo}
            source={require('_assets/farmlifes_Logo.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <Input
              placeholder={strings('Login.emailInput')}
              textStyle={styles.inputStyle}
              value={email}
              onChangeText={email => onEmailChanged(email)}
              onChange={() => {
                setEmailError({
                  status: false,
                  errorMessage: ''
                })
              }}
              error={emailError.status}
              errorMessage={emailError.errorMessage}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder={strings('Login.passwordInput')}
              textStyle={styles.inputStyle}
              secure={!passwordVisibility}
              showPass={true}
              showPassword={() => setPasswordVisibility(!passwordVisibility)}
              onChangeText={password => onPasswordChanged(password)}
              onChange={() => {
                setPasswordError({
                  status: false,
                  errorMessage: ''
                })
              }}
              error={passwordError.status}
              errorMessage={passwordError.errorMessage}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              fn={() => handleLogin()}
              text={strings('Login.signIn')}
              style={styles.button}
              fontStyle={styles.buttonText}
              loading={loading}
            />
            <View style={styles.forgotPasswordView}>
              <Text onPress={goToForgotPassword} style={styles.forgotPasswordText}>{strings('Login.forgotPasswordText')}</Text>
            </View>
          </View>

        </View>

        <BottomView
          goToRegister={goToRegister}
          shift={shift}
        />
      </View>
    </DismissKeyboard>

  );
};


export default Login;
