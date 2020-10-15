import React from 'react';
import {View,StyleSheet,Dimensions} from 'react-native';
import Text from '_components/Text';
import styles from './styles';
import { strings } from '_utils/i18n';

interface BottomViewProps {
  goToLogin: () => void;
}

const BottomView = ({ goToLogin,shift }) => (
  <View style={[styles.container, shift ? styles.shiftKeyboard : null]}>
    <View style={styles.horizontalLine} />
    <View style={styles.innerBottomView}>
      <Text onPress={goToLogin} style={styles.text}>{strings('OnboardingBottomView.question')} </Text>
    </View>
  </View>
);

export default BottomView;