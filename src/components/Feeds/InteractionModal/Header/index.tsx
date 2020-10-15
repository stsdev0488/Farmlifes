import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import InteractionState from '../index';

import Text from '_components/Text';
import styles from './styles';

const ActivityView = ({ imageSource, text, fn }) => (
  <TouchableOpacity
    onPress={fn}
    style={styles.activityViewContainer}>
    <View>
      <Image style={styles.activityViewImage} source={imageSource} />
    </View>
    <View>
      <Text style={styles.activityViewText}>{text}</Text>
    </View>
  </TouchableOpacity>
)

interface HeaderProps {

  onChangeDisplay: () => void;
  onShareCount: () => void;
  interactionCountState: InteractionCountState;

  likeCount: number;
  commentCount: number;
  shareCount: number;
}
export default ({
  onChangeDisplay,
  display,
  onShareCount,
  news,
  interactionCountState: {
    likeCount,
    commentCount,
    shareCount
  }
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <ActivityView
          text={likeCount}
          fn={() => onChangeDisplay('likes')}
          imageSource={
            display !== 'likes' ? require('_assets/feeds/white_like.png') : require('_assets/feeds/likes_green.png')
          }
        />
        {
          news ? null : (
            <ActivityView
              text={commentCount}
              fn={() => onChangeDisplay('comments')}
              imageSource={
                display !== 'comments' ? require('_assets/feeds/comment.png') : require('_assets/feeds/comment_green.png')
              }
            />
          )
        }

        <ActivityView
          text={shareCount}
          fn={() => onChangeDisplay('shares')}
          imageSource={
            display !== 'shares' ? require('_assets/feeds/share.png') : require('_assets/feeds/share_green.png')
          }
        />
      </View>
    </View>
  )
}