import React, {useRef} from 'react';
import Text from '_components/Text';
import Header from './Header';
import SpinnerOverlay from '_components/SpinnerOverlay';
import ImageFlatlist from '_components/Feeds/Post/ImageFlatlist';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';
import {CheckBox} from 'native-base';
import {strings} from '_utils/i18n';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import color from '_config/colors';
import styles from './styles';
import {getUserAvatarImageSource, getFarmAvatarImageSource} from "../../utils/assets";

interface StateProps {
  postText: string;
  onChangePostText: () => void;

  typeOfPost: string;
  onChangeTypeOfPost: () => void;

  publisher: string;
  onChangePublisher: () => void;

  onSubmit: () => void;

  chooseImage: () => void;
}

interface CreatePostProps {
  props: any;
  state: StateProps
}

const textToShow = (text) => {
  switch (text) {
    case 'question':
      return strings('CreatePost.questionPostText');
    case 'help':
      return strings('CreatePost.helpPostText');
    default:
      return strings('CreatePost.normalPostText');
  }
};


// tslint:disable-next-line:no-unused-expression
export default ({ props, postText, removePicture, state, imageUri, chooseImage, userInfo, imageData }: CreatePostProps) => {
  const scrollRef = useRef(null);

  const RoundedView = ({ style }) => <View style={[styles.roundedView, style]} />

  return (
    <View style={styles.container}>
      <Header
        onSubmit={state.onSubmit}
        // postText={state.postText}
        props={props}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.flexGrow1}
        ref={scrollRef}
        onKeyboardDidShow={() => {
          if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollToEnd();
          }
        }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.publishContainer}>
          <Text style={styles.publishText}> {strings('CreatePost.publishAsText')} </Text>
        </View>
        <View style={styles.sharerContainer}>
          <TouchableOpacity
            disabled={userInfo.user.farm_id === null ? true : false}
            onPress={() => state.onChangePublisher('human')}
            style={styles.imageView}>
            <Image
              style={styles.image}
              source={getUserAvatarImageSource(userInfo.user)}
            />
            <RoundedView
              style={state.publisher === 'human' ? styles.roundedViewActive : null}
            />
          </TouchableOpacity>
          {userInfo.user.farm || userInfo.user.farm_id ? (
            <TouchableOpacity
              onPress={() => state.onChangePublisher('farm')}
              style={styles.imageView}>
              <Image
                style={styles.image}
                source={getFarmAvatarImageSource(
                  userInfo && userInfo.user && userInfo.user.farm,
                )}
              />
              <RoundedView
                style={state.publisher === 'farm' ? styles.roundedViewActive : null}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.typeOfPostContainer}>
          <TouchableOpacity
            onPress={() => state.onChangeTypeOfPost('normal')}
            style={styles.postView1}>
            <CheckBox
              style={[styles.checkBoxContainer, state.typeOfPost === 'normal' ? styles.activeCheckBox : null]}
              checked={state.typeOfPost === 'normal' ? true : false}
              color={state.typeOfPost === 'normal' ? color.thickGreen : color.white}
              disabled={true}
            />
            <Text style={styles.postView1Text}>{strings('CreatePost.normalPost')} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => state.onChangeTypeOfPost('question')}
            style={styles.postView2}>
            <CheckBox
              style={[styles.checkBoxContainer, state.typeOfPost === 'question' ? styles.activeCheckBox : null]}
              checked={state.typeOfPost === 'question' ? true : false}
              color={state.typeOfPost === 'question' ? color.thickGreen : color.white}
              disabled={true}
            />
            <Text style={styles.postView2Text}>{strings('CreatePost.questionText')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => state.onChangeTypeOfPost('help')}
            style={styles.postView3}>
            <CheckBox
              checked={state.typeOfPost === 'help' ? true : false}
              style={[styles.checkBoxContainer, state.typeOfPost === 'help' ? styles.activeCheckBox : null]}
              color={state.typeOfPost === 'help' ? color.thickGreen : color.white}
              disabled={true}
            />
            <Text style={styles.postView2Text}>{strings('CreatePost.helpText')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={state.postText}
            style={[styles.textInputStyle, imageUri !== '' ? styles.textInputWithImage : null]}
            multiline={true}
            numberOfLines={imageUri ? 6 : 10}
            placeholderTextColor={color.lightBrown}
            placeholder={textToShow(state.typeOfPost)}
            onChangeText={text => state.onChangePostText(text)}
            autoCorrect={false}
            underlineColorAndroid={color.whiteRGBA}

          />
        </View>
        <View style={styles.flex4}>
          <ImageFlatlist
            style={styles.bigImageCont}
            data={imageData}
            removePicture={removePicture}
            deletefn={true}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomContainerViewText}>
            <Text style={styles.addSomethingText}>{strings('CreatePost.addTextToPost')} </Text>
          </View>
          <View style={styles.bottomContainerView}>
            <Text style={styles.galleryText}>{strings('CreatePost.gallery')}</Text>
            <TouchableOpacity
              onPress={() => chooseImage()}
              style={styles.buttonView}>
              <Image
                style={styles.galleryImage}
                source={require('_assets/feeds/gallery.png')} />
            </TouchableOpacity>
          </View>
        </View>

        {/* </View> */}
        <>{state.loading ? <SpinnerOverlay /> : null}</>
      </KeyboardAwareScrollView>
    </View >
  );

};
