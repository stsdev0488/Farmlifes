import React from 'react';
import { View, TextInput } from 'react-native';
import  { PrimaryButton } from '_components/Button';


import DatePicker from 'react-native-datepicker';

import Text from '_components/Text';
import Input from '_components/Input';
import BottomView from '_components/Onboarding/BottomView'
import { strings } from '_utils/i18n';

import styles from './styles';
import extStyles from '_utils/styles';
import style from 'react-native-datepicker/style';

interface DOBRegProps {
  next: () => void;
  dob: string;
  goToLogin: () => void;
  onDOBChanged: () => void
}

const DOBReg = ({
  next,
  goToLogin,
  onDOBChanged,
  dob,
  shift,
}: DOBRegProps ) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        <View style={styles.innerFirstView}>
          <Text style={styles.innerFirstViewText1}>{strings('DOBReg.question')}</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <DatePicker
          style={styles.datePickerContainer}
          date={dob}
          mode="date"
          placeholder="Select date"
          format="DD-MM-YYYY"
          maxDate="01-01-2006"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: styles.dateIcon,
            dateInput: styles.dateInput,
            dateText: styles.dateText
          }}
          onDateChange={(date) => onDOBChanged(date)}
        />
      </View>
      <View style={styles.textDescriptionView}>
        <Text style={styles.textDescription}>{strings('DOBReg.validation')}</Text>
      </View>

      <View style={styles.pv10}>
        <PrimaryButton
          text={strings('Common.forward')}
          fn={() => next()}
        />
      </View>

      <BottomView
        goToLogin={goToLogin}
        shift={shift}
      />
    </View>
  );
};


export default DOBReg;
