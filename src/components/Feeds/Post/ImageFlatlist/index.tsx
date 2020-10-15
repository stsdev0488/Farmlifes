import React, { useState } from 'react';
import { View, ImageBackground, Dimensions, TouchableOpacity, FlatList } from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import colors from '_config/colors';

const { width, height } = Dimensions.get('window');


const keyExtractor = (item, index) => index.toString();
export default ({ data, style, removePicture,deletefn }) => {

  let indicatorRef;

  const [scrollIndex, setScrollIndex] = useState(2);
  const getItemLayout = (data, index) => ({ length: height / 2, offset: width * index, index });


  flatScroll = (event: { nativeEvent: { contentOffset: { x: number, y: number } } }) => {
    const xOffset = event.nativeEvent.contentOffset.x
    const c = Math.round(xOffset / width);
    setScrollIndex(c)
  }

  return (
    <View>
      <FlatList
        data={data}
        ref={ref => indicatorRef = ref}
        onScroll={flatScroll}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={(item) => (
          <View>
            <ImageBackground
              style={[styles.imageView, style]}
              source={{ uri: item.item.url === null ? 'https://via.placeholder.com/50' : item.item.url }}
            >
              {deletefn ?
                (
                  <TouchableOpacity style={styles.deleteView} onPress={() => removePicture(item.item.index)}>
                    <AntDesignIcon
                      name="delete"
                      size={15}
                      style={styles.icon}

                      color={colors.white} />
                  </TouchableOpacity>

                ) : null
              }
            </ImageBackground>
          </View>
        )}
      />
    </View >
  )

}