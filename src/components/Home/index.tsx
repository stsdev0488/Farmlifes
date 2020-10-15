import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '_components/Text';
import BottomTab from '_components/BottomTab';

import styles from './styles';



// tslint:disable-next-line:no-unused-expression
export default ({ props }) => {
  return(
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text> Home </Text>
      </View>
      <BottomTab 
        props={props}
      />
    </View>
  );

};
