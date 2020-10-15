import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  UIManager,
  Platform,
  LayoutAnimation,
  ScrollView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import {
  getUserSuggestion,
  follow,
  unfollow,
  setFollowUserSuggestion
} from '_actions/user';


import Text from '_components/Text';
import Spinner from '_components/Spinner';
import SuggestionBox from './SuggestionsBox';

import styles from './styles';

import { strings } from '_utils/i18n';

import { animate } from '_utils/animation';
import {navigateToProfile} from '../../../utils/navigation';


const keyExtractor = (item, index) => `follow-user-suggestion-${item.id}`;



if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const areEqual = (prevProps, nextProps) => true;
// export default
const MyComponent = React.memo((props) => {


  const dispatch = useDispatch();

  const { //    props,
    suggestions,
    state,

    loading
  } = props;
  const followUser = data => {
    dispatch(follow(data));
  };

  const removeItem = (data) =
    useCallback(
      (data) => {
        animate()
        followUser(data)
      },
      []
  );

  const renderItem = ({ item }) => {
    const space = (item.subscribed === true && item.modified === true);

    return (
      <View key={item.id} style={!space ? styles.mh8 : null}>
        <SuggestionBox
          text={item.name}
          follow={removeItem}
          visibility={(item.subscribed === true && item.modified === true) ? true : false}
          imageSource={{ uri: item.avatar }}
          data={{
            target_id: item.id,
            target_type: item.type || 'user',
            trigger: true // This will trigger the suggestion to be removed from the suggestion reducer
          }}
          status={item.suggestionStatus}
          onProfilePress={() => navigateToProfile(item)}
        />
      </View>
    )
  }



  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View>
        {
          suggestions.length === 0 ?
            (<Text> {strings('Feeds.noSuggestionsText')}</Text>) :
            (
              <>
                <View style={styles.suggestionsTextView}>
                  <Text style={styles.suggestionsText}>{strings('Feeds.suggestionsForYou')}</Text>
                </View>
                <FlatList
                  contentContainerStyle={styles.suggestionsView}
                  // data={suggestionsp.filter(c => c.subscribed  && c.modified)}

                  data={suggestions}
                  keyExtractor={keyExtractor}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={10}

                  renderItem={renderItem}

                  removeClippedSubviews={true}

                />
              </>
            )
        }
      </View>
    </View>
  )
})

export default MyComponent;
