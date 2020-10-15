import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';

import Input from '_components/Input';
import Text from '_components/Text';
import Spinner from '_components/Spinner';
import Header from '_components/HeaderWithBack';


import styles from './styles';
import extStyles from '_utils/styles';
import {strings} from '../../utils/i18n';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';


import CustomMessage from './CustomMessage';
import CommentFooter from '_components/Feeds/InteractionModal/Footer';
import i18n from '../../utils/i18n';
import {getUser} from "../../services/api";
import {getUserAvatarImageSource} from '../../utils/assets';

interface MessengerProps {
  message: T[];
  onSend: () => void
}

const inputTextFontSize = 15;

const Messenger = ({
  userId,
  messages,
  onSend,
  props,
  userInfo,
  loadMore,
  loadMoreFn,
  loading,
  text,
  onChangeText,
  senderInfo,
  // title,
}) => {
  const state= {
    messages,
    loadMore,
    loading,
  };

  const numberOfLines = (text || '').split('\n').length;
  const height = Math.min(numberOfLines, 5) * inputTextFontSize + 25;

  const Footer = (props) => {
    return (
      <View style={styles.container2}>
        <View>
          <Image
            style={styles.image}
            source={getUserAvatarImageSource(senderInfo)}
          />
        </View>
        <View style={styles.inputView}>
          <AutoGrowingTextInput
            value={text}
            placeholder={strings('Chat.writeAMessage')}
            textStyle={styles.textStyle}
            style={[
              styles.input,
              {
                height,
                maxHeight: height,
                minHeight: height,
              },
            ]}
            multiline={true}
            numberOfLines={5}
            onChangeText={text => onChangeText(text)}
          />
        </View>
        <Send {...props}>
          <TouchableOpacity
            onPress={() => props.onSend({ text: text.trim() }, true)}
          >
            <Image
              style={styles.commentImage}
              source={(text || '').length === 0 ? require('../../assets/headerIcons/inbox.png') : require('../../assets/headerIcons/inbox_green.png')}
            />
          </TouchableOpacity>
        </Send>
      </View>
    )

  }


  const Loading = () => (
    <View style={extStyles.center}>
      <Spinner />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header props={props}
        title={userInfo && userInfo.name}
        fn={() => props.navigation.goBack()}
      />

      <GiftedChat
        // isLoadingEarlier={true}
        isLoadingEarlier={loadMore}

        messages={messages}
        extraData={state}


        loadEarlier={messages && messages.length > 10 && !loadMore}

        onLoadEarlier={() => loadMoreFn()}

        onSend={messages => onSend(messages)}

        renderLoading={Loading}
        renderComposer={Footer}

        renderMessage={props => <CustomMessage {...props} />}

        renderLoading={Loading}
        alwaysShowSend={true}
        user={{
          _id: userInfo.id,
        }}

        getItemLayout={(data, index) => (
            {length: 40, offset: 40 * index, index}
          )}
        // scrollToBottom={true}

        listViewProps={
          {
            onEndReached: () =>  loadMoreFn(),
            onEndReachedThreshold: 0.2,
          }
        }
        locale={i18n.locale}
        dateFormat="L"
      />
    </View>

  )
};

export default Messenger;
