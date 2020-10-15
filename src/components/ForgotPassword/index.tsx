import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '_components/Text';
import styles from './styles';



interface ForgotPasswordProps {}

// tslint:disable-next-line:no-unused-expression
export default (): React.FC<ForgotPasswordProps> => {

  return(
    <View style={styles.container}>
      <Text> ForgotPassword </Text>
    </View>
  );

};
