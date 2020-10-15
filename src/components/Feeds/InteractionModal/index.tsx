import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, PanResponder, Animated, View, TouchableOpacity } from 'react-native';
import { Tabs, Tab } from 'native-base';
import Modal from 'react-native-modal';

import Text from '_components/Text';
import Header from './Header';

import Likes from './Likes';
import Comments from './Comments';
import Shares from './Shares';

import Footer from './Footer';



export interface InteractionCountState {
  likeCount: number,
  commentCount: number;
  shareCount: number
}

interface Props {
  toggle: boolean;
  onToggle: () => void;
  onChangeComment: () => void;
  handleCommentingOnAPost;
  interactionCountState: InteractionCountState;
}

const displayTypes = {
  shares: 'shares',
  comments: 'comments',
  likes: 'likes',
};

const tabPages = {
  [displayTypes.likes]: 0,
  [displayTypes.comments]: 1,
  [displayTypes.shares]: 2,
};

const displayToPageMap = {
  0: displayTypes.likes,
  1: displayTypes.comments,
  2: displayTypes.shares,
};

import styles from './styles';
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      initialPage: displayToPageMap[props.display],
    };
  }


  CompToRender = (val, interactionLoadingState) => {
    const {
      activePost,
      // interactionLoadingState,
    } = this.props

    switch (val) {
      case displayTypes.shares:
        return <Shares
            onToggle={this.props.onToggle}
            loading={interactionLoadingState && interactionLoadingState.shares}
            sharers={activePost && activePost.sharers || []} />;
      case displayTypes.comments:
        return <Comments
            onToggle={this.props.onToggle}
            loading={interactionLoadingState && interactionLoadingState.comments}
            commenters={activePost && activePost.commenters || []} />
      case displayTypes.likes:
        return <Likes
            onToggle={this.props.onToggle}
            loading={interactionLoadingState && interactionLoadingState.likes}
            likers={activePost && activePost.likers || []} />
      default:
        return <Shares
            onToggle={this.props.onToggle}
            loading={interactionLoadingState && interactionLoadingState.shares}
            sharers={activePost && activePost.sharers || []} />;
    }
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: (evt, gestureState) => {

        if (this.state.pan.y._value > 15) {
          return this.props.onToggle()
        }

        return Animated.event([null, {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
        }])(evt, gestureState)
      },

      onPanResponderRelease: (e, { vx, vy }) => {}
    });
  }

  render() {
    const { pan } = this.state;

    const [translateX, translateY] = [pan.x, pan.y];
    const draggableStyle = { transform: [{ translateX }, { translateY }] };

    const {
      toggle,
      onToggle,
      onChangeComment,
      interactionCountState,
      handleCommentingOnAPost,
      activePost,
      comment,
      interactionLoadingState,
      style,
      display,
      onChangeDisplay,
      userInfo,
      news,
      shift,
    } = this.props;

    const tabPage = tabPages[display];

    return (
      <View style={[styles.container, style]}>
        <Modal
          onBackButtonPress={() => onToggle()}
          onBackdropPress={() => onToggle()}
          isVisible={toggle}
          style={styles.marginNull}
          animationInTiming={600}

        >
          <Animated.View style={[styles.closeContainer, draggableStyle]} {...this.panResponder.panHandlers} >
            <TouchableOpacity
              style={styles.closeContainerButton}
            />
          </Animated.View>


          <View style={styles.container2}>
            <Header
              onChangeDisplay={onChangeDisplay}
              interactionCountState={interactionCountState}
              display={display}
              news={news}
            />
            <Tabs
              page={tabPage}
              initialPage={this.state.initialPage}
              onChangeTab={data => {
                if (onChangeDisplay) {
                  onChangeDisplay(displayToPageMap[data.i]);
                }
              }}
              renderTabBar={() => <></>}>
              <Tab heading={''}>
                <ScrollView
                  contentContainerStyle={styles.scrollViewContentContainer}
                  style={styles.scrollViewContainer}>
                  {this.CompToRender(displayTypes.likes, interactionLoadingState)}
                </ScrollView>
              </Tab>
              <Tab heading={''}>
                <ScrollView
                  contentContainerStyle={styles.scrollViewContentContainer}
                  style={styles.scrollViewContainer}>
                  {this.CompToRender(displayTypes.comments, interactionLoadingState)}
                </ScrollView>
              </Tab>
              <Tab heading={''}>
                <ScrollView
                  contentContainerStyle={styles.scrollViewContentContainer}
                  style={styles.scrollViewContainer}>
                  {this.CompToRender(displayTypes.shares, interactionLoadingState)}
                </ScrollView>
              </Tab>
            </Tabs>
            <>
              {display !== 'comments' || news ? null : (
                <Footer
                  handleCommentingOnAPost={handleCommentingOnAPost}
                  onChangeComment={onChangeComment}
                  comment={comment}
                  news={news}
                  shift={shift}
                  userInfo={userInfo}/>
              )}
            </>
          </View>
        </Modal>
      </View>
    )
  }
}
