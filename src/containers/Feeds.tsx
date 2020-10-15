import React, {useState, useCallback, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Keyboard, InteractionManager} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';


import {
  getFeeds,
  likePost,
  unLikePost,
  addCommentToPost,
  getPostLikes,
  getPostComments,
  getPostShares,
} from '../actions/feeds';

import {
  getUserSuggestion,
  follow,
  unfollow,
  setFollowUserSuggestion,
  getUserSuggestionFailed,
} from '../actions/user';


import Feeds from '_components/Feeds';
import { NavigationEvents } from 'react-navigation';

export default ({
  props,
  user,
  renderHeader,
  feedType = 'userFeed',
  showHeader = true,
  isForFarms = false,
  displayAds = false,
  farm,
}: {
  props: any;
  user?: any;
  renderHeader?: any;
  feedType?: 'userFeed' | 'posts';
  showHeader?: boolean;
  isForFarms?: boolean;
  farm?: any;
  displayAds?: boolean;
}) => {
  const dispatch = useDispatch();
  let feeds = useSelector(({feeds}) => feeds);

  let suggestions = useSelector(({suggestions}) => suggestions);

  // Get user information
  const currentUser = useSelector(({user}) => user);

  const [page, onChangePage] = useState(1);

  const [activePost, onChangeActivePost] = useState(null);

  // Handling keyboard state
  const [shift, onShiftChanged] = useState(false);

  const [showInteractionModal, onChangeShowInteractionModal] = useState(false);


  // Content to display in modal
  const [display, onChangeDisplay] = useState('likes')

  const [comment, onChangeComment] = useState('');
  const [reloading, onChangeReloading] = useState(false);

  let keyboardDidShowSub;
  let keyboardDidHideSub;

  const findCoordinates = () => {
    return Geolocation.getCurrentPosition(
      position => {

        // Get user suggestions
        const coords = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }
        dispatch(getUserSuggestion(coords, page));
        return position
      },
      error => {
        dispatch(getUserSuggestionFailed())
        // return error;
      });
  };

  const keyboardDidShow = () => {
    onShiftChanged(true)
  }

  const keyboardHide = () => {
    onShiftChanged(false)
  };

  const getPageData = (): void => {
    const params = {
      page,
      feedType,
      type: 'farm',
      userId: undefined,
      farmId: undefined,
    };

    if (!isForFarms) {
      params.userId = (user && user.id) || currentUser.user.user.id;
    } else {
      params.farmId = farm.id;
    }

    dispatch(getFeeds(params));
  };

  useEffect(() => {
    findCoordinates();
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', keyboardHide);
  }, []);

  useEffect(() => {
    getPageData();
  }, [page, isForFarms, farm && farm.id, user && user.id, currentUser]);

  const forceReloadFirstPage = () => {
    if (page === 1) {
      getPageData();
    } else {
      onChangePage(1);
    }
  };

  const handleReload = () => {
    onChangeReloading(true);
    forceReloadFirstPage();
    onChangeReloading(false);
  };

  const goToPost = () => {
    return props.navigation.navigate('CreatePost')
  }

  const handleLoadMore = async () => {
    if (!feeds.interactionLoadingState.loadMore && !feeds.loading) {
      if (!(feeds.feedType === 'farm' && !!feeds.endLoadMore)) {
        onChangePage(page + 1);
      }
    }
  };

  // Set active post to be used in modal
  const handleSetActivePost = async (post: any, display: string) => {
    onChangeDisplay(display);
    onChangeShowInteractionModal(!showInteractionModal);
    onChangeActivePost(post);

    // TODO: if it's making the interaction modal slower then remove it
    InteractionManager.runAfterInteractions(() => {
      Promise.all([
        dispatch(getPostComments(post.id)),
        dispatch(getPostLikes(post.id)),
        dispatch(getPostShares(post.id)),
      ]);
    });
  };

  // TOD0:
  const handleLikeInteraction = async (id: number, type: string, likedPostStatus: boolean) => {
    //TODO:
    // let typeOfPost = type === null ? 'post' : type;
    // typeOfPost = type === 'question' ? 'post' : type;
    const reqData = {id, type: 'post'};

    if (!likedPostStatus) {
      return dispatch(likePost(reqData));
    }
    return dispatch(unLikePost(reqData));
  };

  const handleCommentingOnAPost = async () => {
    const reqData = {
      id: activePost.id,
      type: 'post',
      text: comment
    };

    const newCommentData = {
      id: Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100),
      created_at: Date.now(),
      author: {
        id: currentUser.user.user.id,
        type: "user",
        name: currentUser.user.user.name,
        avatar: currentUser.user.user.avatar,
      },
      text: comment,
    };

    dispatch(addCommentToPost(reqData, newCommentData));

    Keyboard.dismiss();
    onChangeComment('');
  };

  handleSharePost = (id) => {
    return props.navigation.navigate('SharePost', {id});
  };

  const openGallery = () => {
    return props.navigation.navigate('CreatePost', {openGallery: true})
  };

  const followUser = data => {
    dispatch(setFollowUserSuggestion(data))
    // dispatch(follow(data))
  };

  return (
    <>
      <NavigationEvents
        onWillFocus={payload => {
          if (payload && payload.state && payload.state.routeName === 'Feeds') {
            forceReloadFirstPage();
          }
        }}
      />
      <Feeds
        props={props}

        userInfo={currentUser.user.user}
        goToPost={goToPost}
        showInteractionModal={showInteractionModal}
        onChangeShowInteractionModal={onChangeShowInteractionModal}
        onChangeComment={onChangeComment}

        reloading={reloading}
        handleReload={handleReload}

        display={display}
        onChangeDisplay={onChangeDisplay}

        comment={comment}

        loading={feeds.loading}
        loadMore={feeds.interactionLoadingState.loadMore}
        feeds={feeds.feeds}
        interactionLoadingState={feeds.interactionLoadingState}
        handleLoadMore={handleLoadMore}

        handleSharePost={handleSharePost}
        handleCommentingOnAPost={handleCommentingOnAPost}
        handleLikeInteraction={handleLikeInteraction}

        handleSetActivePost={handleSetActivePost}


        activePost={activePost}

        // suggestions={suggestions.suggestions.filter(c => c.subscribed === true)}
        suggestions={suggestions.suggestions}
        suggestionsLoading={suggestions.suggestionsLoading}

        follow={(data) => followUser(data)}
        // unfollow={(data) => dispatch(unfollow(data))}
        openGallery={openGallery}

        shift={shift}

        onEndReachedThreshold={0.2}

        showHeader={showHeader}
        renderHeader={renderHeader}
        displayAds={displayAds}
      />
    </>
  );
};
