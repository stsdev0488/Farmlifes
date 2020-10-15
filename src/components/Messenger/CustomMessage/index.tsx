import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { Avatar, Day, utils, Time } from 'react-native-gifted-chat';

import styles, { contStyles } from './styles';

const { isSameUser, isSameDay } = utils;

import CustomMessageBubble from '../CustomMessageBubble';

export default class CustomMessage extends React.Component {


  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props;

    return {
      ...props,
      position: 'left',
      isSameUser,
      isSameDay
    };
  }


  renderAvatar() {
    const { currentMessage, previousMessage, user } = this.props;

    let extraStyle;

    if (
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    ) {
      // set the invisible avatar height to 0, but keep the width, padding, etc.
      extraStyle = { height: 0 };
    }

    const avatarProps = this.getInnerComponentProps();
    if (user._id === currentMessage.sender.id) {
      return (
        <View style={styles.avatarContainer}>
          <Avatar
            {...avatarProps}
            imageStyle={{
              left: [ avatarProps.imageStyle, extraStyle, styles.avatar,]
            }}
          />
        </View>
      );
    }


  }

  renderBubble() {

     const { renderBubble } = this.props;

     const bubbleProps = this.getInnerComponentProps();

     if (renderBubble) {
       return renderBubble(bubbleProps);
     }

     return <CustomMessageBubble {...bubbleProps} />;

  }

  render() {
    const { containerStyle, currentMessage, position, nextMessage } = this.props;

    const sameUser = isSameUser(currentMessage, nextMessage!)

    return (
        <View style={
          [
            contStyles[position].container,
            sameUser ?styles.mb2 : styles.mbBig,
            containerStyle && containerStyle[position],
          ]
        }>
          {this.renderAvatar()}
          {this.renderBubble()}
        </View>
    );
  }
}

export default CustomMessage;
