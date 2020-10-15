import React, { useCallback } from 'react';
import { View, UIManager, FlatList, Platform, RefreshControl } from 'react-native';
import Text from '_components/Text';

import Box from './Box';
import Header from './Header';
import ProgressBar from './ProgressBar';

import Spinner from '_components/Spinner';

import extStyles from '_utils/styles';
import styles from './styles';

import { animate } from '_utils/animation';
import {strings} from '../../utils/i18n';
import {getUserAvatarImageSource} from "../../utils/assets";

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  reloading: () => void;
  loadMore: boolean;
  handleLoadMore: () => void;
  follow: () => void;
}

const keyExtractor = (item, index) => index.toString();

// tslint:disable-next-line:no-unused-expression
export default ({
  props,
  reloading,
  suggestions,
  handleLoadMore,
  handleReload,
  loading,
  loadMore,
  follow,
  unfollow,
  followedPeopleCount,
}) => {

  const Footer = () => (
    loadMore ? <Spinner style={styles.footerSpinner} /> : null
  )

  removeItem = (data) =
    useCallback(
      (data) => {
        animate()
        unfollow(data)
      },
      []
    )

  const renderItem = ({ item }) => {
    return (
      <Box
        targetId={item.id}
        targetType={item.type || 'user'}
        follow={follow}
        subscribed={item.subscribed}
        modified={item.modified}
        unfollow={removeItem}
        name={item.name}
        avatar={getUserAvatarImageSource(item)}
      />
    );
  };

  const renderHeader = () => (
    <>
      <Header />
      <View style={styles.afterHeader}>
        <Text style={styles.afterHeaderText}>{strings('FindPeople.peopleAndFarmsNearYou')}</Text>
      </View>
      <ProgressBar followedPeopleCount={followedPeopleCount} />
    </>
  )

  if (loading) {
    return (
      <View style={extStyles.center}>
        <Spinner />
      </View>
    )
  }

  if (suggestions.length === 0) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.noSuggestionView}>
          <Text> No suggestions at the moment </Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={reloading} onRefresh={handleReload} />
      }
      contentContainerStyle={styles.innerContainer}
      data={suggestions}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={renderHeader()}
      extraData={suggestions}
      keyExtractor={keyExtractor}
      initialNumToRender={15}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={0.1}
      onEndReached={handleLoadMore}
      ListFooterComponent={Footer}
      removeClippedSubviews={true}
      maxToRenderPerBatch={15}
      renderItem={renderItem}
    />
  );
};
