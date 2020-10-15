import React from 'react';
import { View } from 'react-native';

import Text from '_components/Text';

import styles from './styles';


const viewColor  = (text) => {
  switch(text){
    case 'forum':
      return styles.questionBox;
      // return styles.forumBox;

    case 'question':
      return styles.questionBox;

    default:
      return {};
  }
}

export default ({ title,postType })=> (
  <View style={[styles.container, viewColor(postType)]}>
    <Text style={[styles.text, postType !== 'help' ? styles.whiteText : null]}>{title}</Text>
  </View>
)

