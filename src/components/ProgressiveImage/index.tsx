import React from 'react';
import { View, StyleSheet, ImageSourcePropType, Animated } from 'react-native';

import styles from './styles';




interface ProgressiveImageProps {
  imageStyle?: any;
  source?: ImageSourcePropType;
  style?: any
}


const ProgressiveImage = ({ source, imageStyle, style, ...props }) => {

  const thumbnailAnimated = new Animated.Value(0);

  const imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
    }).start();
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }, style, imageStyle]}
        onLoad={onImageLoad}
      />
    </View>
  );
}



export default ProgressiveImage;