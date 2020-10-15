import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '_components/Text';

import styles from './styles';
import extStyles from '_utils/styles';


const ProgressBar = ({ followedPeopleCount  }) => {
  
  followedPeopleCount = followedPeopleCount === 0 ? 0 : followedPeopleCount;
  followedPeopleCount = followedPeopleCount > 100 ? 100 : followedPeopleCount;  

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.firstTopView}>
          <Text style={styles.textStyle}>
            0
          </Text>
        </View>

        <View style={styles.secondTopView}>
          <View style={extStyles.aic}>
            <Text style={styles.textStyleSecond}>
              100
            </Text>
            <Text style={styles.textStyleSecond}>
              optimal
            </Text>
          </View>
          
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressBarView, { width: `${followedPeopleCount}%`}]} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.textStyle}>
          {followedPeopleCount}
        </Text>
      </View>

    </View>
  );
}
export default ProgressBar;
