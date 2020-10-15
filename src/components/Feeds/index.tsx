import React, {memo} from 'react';
import Header from '_components/Header';
import HeaderBack from '_components/HeaderWithBack';
import Text from '_components/Text';
import BottomTab from '_components/BottomTab';
import Spinner from '_components/Spinner';
import PostHeader from './PostHeader';
import Suggestions from './Suggestions';
import Post from './Post';
import InteractionModal from './InteractionModal';
import styles from './styles';
import extStyles from '_utils/styles';
import {getUserAvatarImageSource} from "../../utils/assets";
import {strings} from '_utils/i18n';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {toTimeAgo} from '../../utils/common';
import {View, ScrollView, FlatList, RefreshControl, Platform} from 'react-native';

const addConfig = {
  ios: ['ca-app-pub-8195408990554671/9052182101', 'ca-app-pub-8195408990554671/4832422414'],
  android: ['ca-app-pub-8195408990554671/6802295427', 'ca-app-pub-8195408990554671/7923805404']
};

interface FeedsProps {
  showLikesModal: boolean;
  showCommentsModal: boolean;
  loading: boolean;

  feeds: T[];
  loading: boolean;

  activePost: any;

  onChangeShowLikesModal: () => void;
  onChangeShowCommentsModal: () => void;
  onChangeComment: () => void;

  goToPost: () => void;
  handleSharePost: () => void;
  handleLoadMore: () => void;


  handleCommentingOnAPost: () => void;
  handleLikeInteraction: () => void;

  follow: () => void;
  unfollow: () => void;

  showHeader: boolean,
  renderHeader: any,
}
const keyExtractor = (item, index) => `feeds-post-${item.id}-${index}`;


// tslint:disable-next-line:no-unused-expression
const Feeds = ({
  // const {
  props,
  goToPost,

  handleLoadMore,
  showInteractionModal,
  onChangeShowInteractionModal,
  onChangeComment,

  feeds,
  comment,
  loading,
  loadMore,

  reloading,
  handleReload,

  handleSetActivePost,

  activePost,

  handleLikeInteraction,
  handleCommentingOnAPost,

  hashTag,

  display,
  onChangeDisplay,

  interactionLoadingState,

  userInfo,
  suggestions,
  suggestionsLoading,
  // hashTagHeader,

  headerName,
  follow,
  news,
  unfollow,

  headerBack,
  openGallery,

  shift,

  showHeader = true,
  renderHeader,
  displayAds = false,
}: FeedsProps) => {

  const state = {

    showInteractionModal,
    onChangeShowInteractionModal,

    handleCommentingOnAPost,
    handleLikeInteraction,

    handleSetActivePost,

  };

  const showBackHeader = (hashTag || headerBack || headerName);

  const renderHeaderComp = () => {
    if (showBackHeader) {
      return <HeaderBack title={headerName} fn={props.navigation.goBack} />;
    }

    if (!showHeader) {
      return null;
    }

    return (
      <>
        <PostHeader
          imageSource={getUserAvatarImageSource(userInfo)}
          goToPost={goToPost}
          openGallery={openGallery}
        />
        <View style={styles.divider} />
        <Suggestions
          state={state}
          // extraData={Object.assign({}, feeds,suggestions, state)}
          suggestions={suggestions}
          // suggestions={suggestions.filter((c) => !c.subscribed === true) || []}
          loading={suggestionsLoading}
          follow={follow}
          unfollow={unfollow}
        />
        <View style={styles.divider} />
      </>
    )
  };


  const Footer = () => (
    (loadMore || loading) ? <Spinner style={styles.footerSpinner} /> : null
  );

  const renderAd = index => {
    const postNumber = index + 1;
    let addType;

    if (postNumber === 4) {
      addType = 1;
    }

    if (postNumber === 10) {
      addType = 2;
    }

    if (!addType) {
      return null;
    }

    return (
      <View style={styles.addViewContainer}>
        <BannerAd
          unitId={addConfig[Platform.OS][addType - 1]}
          size={addType === 1 ? BannerAdSize.FULL_BANNER : BannerAdSize.MEDIUM_RECTANGLE}
        />
      </View>
    )
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <Post
          hashTag={hashTag}
          key={item.id}
          props={props}
          id={item && item.id}
          userName={item && item.author && item.author.name}
          profilePicture={getUserAvatarImageSource(item && item.author)}
          singlePostImage={item && item.attachment}
          postImage={item && item.article && item.article.attachments}
          postContent={item && item.text}
          daysAgo={toTimeAgo(((item && item.created_at) * 1000))}
          liked={item && item.liked}
          typeOfPost={item && item.type}
          handleSharePost={handleSharePost}
          interactionCount={{
            likes: item && item.likes_count,
            comments: item && item.comments_count,
            shares: item && item.shares_count,
          }}
          displayFarmName={item.author && item.author.type !== 'farm'}
          farmName={item.farm && item.farm.name}
          state={state}
          post={item}
          news={news}
          userInfo={userInfo}
          onToggle={handleSetActivePost}
        />
        {displayAds && renderAd(index)}
      </>
    );
  };

  return (
    <>
      {showHeader && !showBackHeader && <Header props={props} />}

      {loading && !renderHeader ? (
        <View style={extStyles.center}>
          <Spinner />
        </View>
      ) : (
        <>
          <>
            {news ? (
              <View style={styles.news}>
                <Text style={styles.newsText}>{strings('News.newsHeaderText')}</Text>
              </View>
            ) : null}
          </>

          <FlatList
            style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={reloading}
                onRefresh={handleReload}
            />}
            refreshing={reloading || loading}
            ListHeaderComponent={renderHeader ? renderHeader() : renderHeaderComp()}
            contentContainerStyle={[styles.innerContainer, !loadMore ? styles.pb50 : null]}
            data={feeds}
            extraData={Object.assign({}, feeds, state)}
            keyExtractor={keyExtractor}
            initialNumToRender={10}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            onEndReached={handleLoadMore}
            ListFooterComponent={Footer}
            // removeClippedSubviews={true}

            // Attempt to fix react-native video
            windowSize={150}
            maxToRenderPerBatch={15}

            renderItem={renderItem}

          // removeClippedSubviews={false}
          />
        </>
      )
      }
      <>
        {
          !showInteractionModal ?
            (
              <BottomTab
                props={props}
              />
            )
            : (
              <InteractionModal
                news={news}
                shift={shift}
                style={!showInteractionModal ? styles.flex0 : styles.flex1}
                userInfo={userInfo}
                activePost={activePost}
                toggle={showInteractionModal}
                comment={comment}
                onChangeComment={onChangeComment}
                display={display}
                onChangeDisplay={onChangeDisplay}
                handleCommentingOnAPost={handleCommentingOnAPost}
                onToggle={() => state.onChangeShowInteractionModal(!showInteractionModal)}
                onShareCount={() => props.navigation.navigate('SharePost', { id: activePost.id })}
                interactionLoadingState={interactionLoadingState}
                interactionCountState={{
                  likeCount: activePost && activePost.likes_count || 0,
                  commentCount: activePost && activePost.comments_count || 0,
                  shareCount: activePost && activePost.shares_count || 0
                }}
              />
            )
        }
      </>
    </>
  );
}

Feeds.defaultProps = {
  showHeader: true
};

export default Feeds;
