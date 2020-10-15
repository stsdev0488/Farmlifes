import React, { useState } from 'react';
import { View, TouchableOpacity, Image,ImageSourcePropType } from 'react-native';
import Text from '_components/Text';

import styles from './styles';

interface BoxProps {
  text: string;
  imageSource: ImageSourcePropType;
  onPress: () => void
}


const Box = ({ text, imageSource,onPress }: BoxProps) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[styles.boxContainer, text === 'gallery' ? styles.noBorder : null]}>
    <View style={styles.viewInTextContainer}>
      <Text style={styles.textInBox}>{text}</Text>
    </View>
    <View style={styles.imageContainer}>
      <Image
        style={styles.imageStyle}
        source={imageSource}
      />
    </View>
  </TouchableOpacity>
);

export default Box;
