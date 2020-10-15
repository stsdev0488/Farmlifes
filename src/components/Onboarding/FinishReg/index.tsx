import React from 'react';
import { View, TextInput } from 'react-native';
import Button, { PrimaryButton } from '_components/Button';
import Text from '_components/Text';
import Input from '_components/Input';
import BottomView from '_components/Onboarding/BottomView'
import { strings } from '_utils/i18n';

import styles from './styles';
import extStyles from '_utils/styles';

interface FinishRegInteface{
  next: () => void;
  loading: boolean;
  goToLogin: () => void;
  openLink:(link: string)=> void;
}

const FinishReg = ({ next, loading, goToLogin,openLink }:FinishRegInteface ) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        <View style={styles.innerFirstView}>
          <Text style={styles.innerFirstViewText1}>{strings('FinishReg.header')}</Text>
        </View>
      </View>

      <View style={styles.textDescriptionView}>
        <View style={extStyles.row}>
          <Text style={styles.textDescription}>{strings('FinishReg.body1')}</Text>
        </View>
        <View style={extStyles.row}>
          <Text style={styles.hyperLink} onPress={() => openLink('https://info.farmlifes.com/service/agbs/')}>{strings('FinishReg.body2')}</Text>
        </View>
        <View style={extStyles.row}>
          <Text style={styles.textDescription}>{strings('FinishReg.body3')}</Text>
          <Text style={styles.hyperLink} onPress={() => openLink('https://info.farmlifes.com/datenschutz/')}>{strings('FinishReg.body4')}</Text>
          <Text style={styles.textDescription}>{strings('FinishReg.body5')}</Text>
        </View>
        <View style={extStyles.row}>
          <Text style={styles.textDescription}>{strings('FinishReg.body6')}.</Text>
        </View>
        <View style={extStyles.row}>
          <Text style={styles.hyperLink} onPress={() => openLink('https://info.farmlifes.com/datenschutz/')}>{strings('FinishReg.body7')}</Text>
          <Text style={styles.textDescription}>{strings('FinishReg.body8')}</Text>
        </View>

        <Text style={styles.textDescription}>{strings('FinishReg.body9')}</Text>
        <Text style={styles.textDescription}>{strings('FinishReg.body10')}</Text>
      </View>
      <Button
        text={strings('FinishReg.register')}
        loading={loading}
        fn={() => next()}
        // disabled={}
        style={styles.button}
        fontStyle={styles.fontStyle}
      />
      <BottomView
        goToLogin={goToLogin}
      />
    </View>
  );
};


export default FinishReg;
