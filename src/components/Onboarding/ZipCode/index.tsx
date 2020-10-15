import React from 'react';
import { View, TextInput } from 'react-native';
import { PrimaryButton } from '_components/Button';
import Text from '_components/Text';
import BottomView from '_components/Onboarding/BottomView'
import Input from '../../../components/Input';
import DismissKeyboard from '_components/DismissKeyboard';
import { strings } from '_utils/i18n';


import styles from './styles';

interface ErrorInterface {
  status: boolean;
  errorMessage: string;
}

interface ZipCodeProps {
  next: () => void;
  onZipCodeChanged: () => void;
  setError: () => void;
  zipCode: string;
  error: ErrorInterface;
  goToLogin: () => void;
}

const ZipCode = ({
  next,
  onZipCodeChanged,
  zipCode,
  error,
  setError,
  goToLogin,
  shift,
}: ZipCodeProps) => {
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.firstView}>
          <View>
            <Text style={styles.innerFirstViewText}>{strings('ZipCode.header')}</Text>
          </View>
          <View style={styles.innerSecondView}>
            <Text style={styles.innerSecondViewText}>{strings('ZipCode.question')}</Text>
          </View>
        </View>
        <View style={[styles.inputContainerStyle, error.status ? styles.errorInputContainerStyle : null]}>
          <Input
            value={zipCode}
            maxLength={10}
            numb={true}
            onChangeText={zipCode => onZipCodeChanged(zipCode)}
            onChange={() => {
              setError({
                status: false,
                errorMessage: ''
              })
            }}
            textStyle={{
              ...styles.inputTextStyle,
              ...(error.status ? styles.errorInputTextStyle : {}),
            }}
            style={[
              styles.inputStyle,
              error.status ? styles.errorInputStyle : null,
            ]}
            errorStyle={{height: 70, backgroundColor: 'blue'}}
            textAlign="center"
          // error={error.status}
          // errorMessage={error.errorMessage}
          />
          {
            error.status ? (
              <View style={styles.bottomErrorContainer}>
                <Text style={styles.bottomErrorText}>{error.errorMessage}</Text>
              </View>
            ) : null
          }

        </View>
        <View style={styles.thirdView}>
          <Text style={styles.thirdViewText}>{strings('ZipCode.enterZipCode1')}</Text>
          <Text style={styles.thirdViewText}>{strings('ZipCode.enterZipCode2')}</Text>
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


export default ZipCode;
