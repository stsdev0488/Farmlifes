import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {strings} from '../../../../utils/i18n';

// import AutogrowInput from 'react-native-autogrow-input';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import Input from '_components/Input'
import styles from './styles';
import { getUserAvatarImageSource } from '../../../../utils/assets';

const {height} = Dimensions.get('window');

interface Props {
  onChangeComment: () => void;
  handleCommentingOnAPost: () => void;
  comment: string;
}

const minInputHeight = 40;

export default ({onChangeComment, comment, handleCommentingOnAPost, userInfo, shift}) => {
  const [inputHeight, onChangeInputHeight] = useState(minInputHeight);

  const heightStyle = {
    height: Math.max(inputHeight, minInputHeight),
    minHeight: Math.max(inputHeight, minInputHeight)
  };
  console.info('hs', heightStyle);

  return (
    <View
      style={[
        styles.container,
        shift ? styles.containerKeyboard : null
      ]}>
      <View style={[styles.imageContainer, shift ? styles.imageContainerKeyboard : null]}>
        <Image style={styles.image} source={getUserAvatarImageSource(userInfo)}/>
      </View>
      <View style={[styles.inputView, shift ? styles.inputViewKeyboard : null, heightStyle]}>
        <AutoGrowingTextInput
          value={comment}
          placeholder={strings('Common.writeAComment')}
          textStyle={[styles.textStyle, shift ? styles.textStyleViewKeyboard : null]}
          style={[styles.input, shift ? styles.inputViewKeyboard : null, heightStyle]}
          multiline={true}
          numberOfLines={8}
          onChangeText={text => onChangeComment(text)}
          onContentSizeChange={event => {
            onChangeInputHeight(event.nativeEvent.contentSize.height + 10)
          }}
        />
      </View>
      <TouchableOpacity
        style={[styles.imageContainer, shift ? styles.imageContainerKeyboard : null]}
        onPress={() => handleCommentingOnAPost()}
        // disabled={comment && comment.length < 1 ? false : true}
      >
        <Image
          style={styles.commentImage}
          source={comment.length < 1 ? require('_assets/interactions/commentFooter.png') : require('_assets/interactions/commentFooterGreen.png')}
        />
      </TouchableOpacity>
    </View>
  )
}
