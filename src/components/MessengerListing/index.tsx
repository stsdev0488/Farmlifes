import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Text from '_components/Text';
import Header from '_components/Header';
import Spinner from '_components/Spinner';
import BottomTab from '_components/BottomTab';
import MessengerContent from './MessengerContent';
import styles from './styles';
import {isLoading} from "../../actions/onBoarding";
import {strings} from '../../utils/i18n';
import {getFarmAvatarImageSource} from '../../utils/assets';

const RoundedView = ({style}) => <View style={[styles.roundedView, style]} />;

const getMessagePreviewText = text => {
  if (text) {
    const limit = 35;

    const lines = text.split('\n');
    if (lines.length > 1) {
      return lines[0];
    } else if (text.length <= limit) {
      return text;
    } else {
      return `${text.substring(0, limit)}...`;
    }
  }
};

// tslint:disable-next-line:no-unused-expression
export default ({
  props,
  messages,
  loading,
  state,
  userInfo,
  goToMessage,
  publisher,
  onRefresh
}) => {
  const renderConversation = ({item: c}) => {
    let otherParticipant =
      c &&
      c.participants &&
      c.participants.filter(c => c && c.id !== userInfo.id);
    const senderParticipant =
      c &&
      c.participants &&
      c.participants.filter(c => c && c.id === userInfo.id);
    if (
      otherParticipant &&
      otherParticipant[0] &&
      otherParticipant[0].id === userInfo.farm_id
    ) {
      otherParticipant =
        publisher === 'human' ? otherParticipant : senderParticipant;
    }
    c.publisher = publisher;

    return (
      <MessengerContent
        goToMessage={goToMessage}
        data={c}
        active={c && !c.seen}
        imgSource={
          (otherParticipant &&
            otherParticipant[0] &&
            otherParticipant[0].avatar && {uri: otherParticipant[0].avatar}) ||
          require('../../assets/placeholders/profile_picture.png')
        }
        upText={
          otherParticipant && otherParticipant[0] && otherParticipant[0].name
        }
        downText={getMessagePreviewText(c && c.last_message && c.last_message.message)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header props={props} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.flexGrow}>
        <View style={styles.newsView}>
          <Text style={styles.newsText}>{strings('Chat.newsFrom')}</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.sharerContainer}>
            <TouchableOpacity
              disabled={userInfo && userInfo.farm_id === null ? true : false}
              onPress={() => state.onChangePublisher('human')}
              style={styles.imageView}>
              <Image
                style={styles.image}
                source={
                  (userInfo && userInfo.avatar && {uri: userInfo.avatar}) ||
                  require('../../assets/placeholders/profile_picture.png')
                }
              />
              <RoundedView
                style={
                  state.publisher === 'human' ? styles.roundedViewActive : null
                }
              />
            </TouchableOpacity>
            {userInfo && (userInfo.farm_id || userInfo.farm) ? (
              <TouchableOpacity
                onPress={() => state.onChangePublisher('farm')}
                style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={getFarmAvatarImageSource(userInfo && userInfo.farm)}
                />
                <RoundedView
                  style={
                    state.publisher === 'farm' ? styles.roundedViewActive : null
                  }
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <>
          <View style={{flex: 1}}>
            <FlatList
              data={messages || []}
              renderItem={renderConversation}
              ListEmptyComponent={() =>
                !loading ? (
                  <View style={styles.noActiveContainer}>
                    <Text>{strings('Chat.noActiveConversations')}</Text>
                  </View>
                ) : null
              }
              ListFooterComponent={() =>
                loading ? (
                  <View style={styles.spinner}>
                    <Spinner />
                  </View>
                ) : null
              }
              keyExtractor={conversation =>
                `conversation-${conversation.id}`
              }
              contentContainerStyle={{flex: 1}}
              refreshing={loading}
              onRefresh={onRefresh}
            />
          </View>
        </>
      </ScrollView>
      <BottomTab props={props} />
    </View>
  );
};
