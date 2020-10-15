import React, { useState } from 'react';
import { View,Image } from 'react-native';
import Text from '_components/Text';

import Box from './Box';

import { strings } from '_utils/i18n';
import styles from './styles';


// tslint:disable-next-line:no-unused-expression
export default ({ props, goToPost, imageSource, openGallery }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.imageStyle} source={imageSource} />
      </View>
      <View style={styles.viewBoxContainer}>
        <Box
          text={strings('Feeds.postButton')}
          imageSource={require('../../../assets/feeds/post.png')}
          onPress={goToPost}
        />
        <View 
          style={styles.emptyView}
        />
        <Box
          text={strings('Feeds.galleryButton')}
          imageSource={require('../../../assets/feeds/gallery.png')}
          onPress={openGallery}
        />
      </View>
    </View>
  );

};
