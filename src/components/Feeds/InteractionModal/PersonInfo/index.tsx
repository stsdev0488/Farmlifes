import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Text from '_components/Text';
import styles from './styles';

export  default ({ imageSource, name, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View>
      <Image style={styles.image} source={imageSource} />
    </View>
    <View>
      <Text style ={styles.text}>{name}</Text>
    </View>
  </TouchableOpacity>
)
