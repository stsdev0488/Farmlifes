import React from 'react';
import {
  Clipboard,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  MessageText,
  MessageImage,
  Time,
  Day,
  utils
} from 'react-native-gifted-chat';


const { isSameDay,isSameUser } = utils;

import styles from './styles';




export default class CustomMessageBubble extends React.Component {
  constructor(props) {
    super(props);

    this.onLongPress = this.onLongPress.bind(this);
  }


  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props;

    return {
      ...props,
      position: 'left',
      isSameUser,
      isSameDay
    };
  }
  onLongPress() {
    const { currentMessage, onLongPress } = this.props;

    if (onLongPress) {
      onLongPress(this.context, currentMessage);
    } else if (currentMessage.text) {
      const options = ['Copy Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      const { actionSheet } = this.context;

      actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex
        },
        buttonIndex => {
          switch (buttonIndex) {
            default:
            case 0:
              Clipboard.setString(currentMessage.text);
              break;
          }
        }
      );
    }
  }

  renderMessageText() {
    const { currentMessage, renderMessageText, user } = this.props;

    if (currentMessage.text) {
      const { ...messageTextProps } = this.props;

      if (renderMessageText) {
        return renderMessageText(messageTextProps);
      }

      if (currentMessage && currentMessage.sender && currentMessage.sender.id !== user._id) {
        return (
          <MessageText
            {...messageTextProps}
            textStyle={
              {
                left: styles.messageText,
              }
            }
          />
        );
      }

      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            right: styles.senderMessageText
          }}
        />
      );
    }
  }




  renderTime() {
    const { currentMessage, renderTime } = this.props;

  
    if (currentMessage.createdAt) {
      const { ...timeProps } = this.props;

      if (renderTime) {
        return renderTime(timeProps);
      }

      return (
        <Time
          {...timeProps}
          containerStyle={{ left: [styles.containerTime] }}
          timeTextStyle={{ left: [timeProps.textStyle, styles.timeText], right: [timeProps.textStyle, styles.timeText] }}
        />
      );
    }

    return null;
  }

  renderDay() {
    const { currentMessage, renderDay } = this.props;
    if (currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();

      if (renderDay) {
        return renderDay(dayProps);
      }

      return (
        <Day
          {...dayProps}
          containerStyle={styles.containerDay}
          textStyle={styles.dayText}
        />
      );
    }

    return null;
  }

  render() {
    const { currentMessage, previousMessage, touchableProps, user } = this.props;

    const isSameThread = isSameUser(currentMessage, previousMessage)

    return (
      <View style={[styles.container, currentMessage && currentMessage.sender && currentMessage.sender.id === user._id ? styles.flexStart : null]}>
          <View style={styles.timeStyle}>
            {this.renderTime()}
            {this.renderDay()}
          </View>
          <View style={[styles.containerContent, currentMessage && currentMessage.sender && currentMessage.sender.id === user._id ? styles.senderContainerContent : null]}>
            {isSameThread ? (
              <>
                {this.renderMessageText()}
              </>
            ) : (
                <>
                  <View style={styles.containerMsgHeader}>
                    {this.renderMessageText()}
                  </View>
                </>
              )}

          </View>
      </View>
    );
  }
}
