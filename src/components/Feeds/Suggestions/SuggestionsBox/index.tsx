import React, { useState } from 'react';
import {
  View,
  Image, TouchableOpacity,
} from 'react-native';

import Text from '_components/Text';
import Button from '_components/Button';

import styles from './styles';
import { strings } from '_utils/i18n';


export default ({props, visibility, text, imageSource, status, follow, data, onProfilePress}) => {

  if (visibility) {
    return null;
  }

  const userName = text.length > 15 ? `${text.substring(0, 15)}...` : text;


  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={onProfilePress}>
          <Image
            style={styles.imageStyle}
            source={
              imageSource.uri === null
                ? require('../../../../assets/placeholders/profile_picture.png')
                : imageSource
            }
            resizeMethod="scale"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <TouchableOpacity onPress={onProfilePress}>
          <Text style={styles.textStyle}>{userName}</Text>
        </TouchableOpacity>
      </View>
      <Button
        fontStyle={styles.buttonFont}
        style={styles.button}
        text={strings('Feeds.follow')}
        fn={() => follow(data)}
      />
    </View>
  )
};
