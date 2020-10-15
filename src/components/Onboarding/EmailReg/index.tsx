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
  errorMessage?: string;
}

interface EmailRegProps {
  next: () => void;
  onEmailChanged: () => void;
  setError: () => void;
  email: string;
  error: ErrorInterface;
  goToLogin: () => void;
}

const EmailReg = ({
  next,
  onEmailChanged,
  setError,
  email,
  error,
  goToLogin,
  shift,
}: EmailRegProps) => {
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.firstView}>
          <View style={styles.innerFirstView}>
            <Text style={styles.innerFirstViewText1}>{strings('EmailReg.question')}</Text>
          </View>
        </View>
        <View style={styles.pv10}>
          <Input
            value={email}
            placeholder="example@example.com"
            onChangeText={email => onEmailChanged(email)}
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
        <View style={styles.pv10}>
          <PrimaryButton
            text={strings('Common.forward')}
            fn={() => next()}
          />
        </View>

        <View style={styles.textDescriptionView}>
          <Text style={styles.textDescription}>{strings('EmailReg.instruction')}</Text>
        </View>
        <BottomView
          goToLogin={goToLogin}
          shift={shift}
        />
      </View>
    </DismissKeyboard>
  );
};


export default EmailReg;
