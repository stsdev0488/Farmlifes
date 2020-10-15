import React from 'react';
import { View, TextInput } from 'react-native';
import { PrimaryButton } from '_components/Button';
import Text from '_components/Text';
import Input from '_components/Input';
import BottomView from '_components/Onboarding/BottomView';
import DismissKeyboard from '_components/DismissKeyboard';
import { strings } from '_utils/i18n';

import styles from './styles';

interface ErrorInterface {
  status: boolean;
  errorMessage?: string;
}

interface PasswordRegProps {
  next: () => void;
  setPasswordVisibility: () => void;
  setError: () => void;
  onPasswordChanged: () => void;
  password: string;
  passwordVisibility: boolean;
  error: ErrorInterface;
  goToLogin: () => void;
}


const PasswordReg = ({
  next,
  setPasswordVisibility,
  setError,
  password,
  error,
  passwordVisibility,
  onPasswordChanged,
  goToLogin,
  shift,
}: PasswordRegProps) => {
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.firstView}>
          <View style={styles.innerFirstView}>
            <Text style={styles.innerFirstViewText1}>{strings('PasswordReg.header')}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={password}
            secure={!passwordVisibility}
            showPass={true}
            showPassword={() => setPasswordVisibility(!passwordVisibility)}
            placeholder={strings('PasswordReg.password')}
            onChangeText={password => onPasswordChanged(password)}
            onChange={() => {
              setError({
                status: false,
                errorMessage: ''
              })
            }}
            error={error.status}
            errorMessage={error.errorMessage}
          />
        </View>
        <View style={styles.secondView}>
          <Text style={styles.secondViewText}>{strings('PasswordReg.validation')}</Text>
        </View>
        <PrimaryButton
          text={strings('Common.forward')}
          fn={() => next()}
        // disabled={}
        />
        <BottomView
          goToLogin={goToLogin}
          shift={shift}
        />
      </View>
    </DismissKeyboard>
  );
};


export default PasswordReg;
