import React from 'react';
import { View, TextInput } from 'react-native';
import { PrimaryButton } from '_components/Button';
import Text from '_components/Text';
import Input from '_components/Input';
import DismissKeyboard from '_components/DismissKeyboard';
import BottomView from '_components/Onboarding/BottomView'
import { strings } from '_utils/i18n';

import styles from './styles';

interface ErrorInterface {
  status: boolean;
  nameErrorMessage?: string;
  surNameErrorMessage?: string;
}

interface NameRegProps {
  next: () => void;
  onNameChanged: () => void;
  setNameError: () => void;
  name: string;
  nameError: ErrorInterface;

  onSurNameChanged: () => void;
  surNameError: () => void;
  surName: string;
  surNameError: ErrorInterface;
  goToLogin: () => void;

}

const NameReg = ({
  next,
  onNameChanged,
  setNameError,
  name,
  nameError,

  onSurNameChanged,
  surNameError,
  surName,
  setSurNameError,
  goToLogin,
  shift,
}: NameRegProps) => {
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.firstView}>
          <View style={styles.innerFirstView}>
            <Text style={styles.innerFirstViewText1}>{strings('NameReg.question')}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputViewStyle}>
            <Input
              value={name}
              placeholder={strings('NameReg.name')}
              textStyle={styles.inputStyle}
              onChangeText={name => onNameChanged(name)}
              onChange={() => {
                setNameError({
                  status: false,
                  errorMessage: ''
                })
              }}
              error={nameError.status}
              errorMessage={nameError.errorMessage}
            />
          </View>

          <View style={styles.inputViewStyle}>
            <Input
              value={surName}
              placeholder={strings('NameReg.surName')}
              textStyle={styles.inputStyle}
              onChangeText={surName => onSurNameChanged(surName)}
              onChange={() => {
                setSurNameError({
                  status: false,
                  errorMessage: ''
                })
              }}
              error={surNameError.status}
              errorMessage={surNameError.errorMessage}
            />
          </View>
        </View>
        <View style={styles.button}>
          <PrimaryButton
            text={strings('Common.forward')}
            fn={() => next()}
          // disabled={}
          />
        </View>
        <BottomView
          goToLogin={goToLogin}
          shift={shift}
        />
      </View>
    </DismissKeyboard>
  );
};


export default NameReg;
