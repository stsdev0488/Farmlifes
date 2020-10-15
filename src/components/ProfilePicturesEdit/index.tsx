import React, {useState} from 'react';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {strings} from '../../utils/i18n';

interface Props {
  profilePicture?: string;
  bannerPicture?: string;
  onProfilePictureChange?: any;
  onBannerPictureChange?: any;
}

export default (props: Props): any => {
  const [selectedFiles, setSelectedFiles] = useState({
    profilePicture: null,
    bannerPicture: null,
  });

  const openDialog = (type: 'profilePicture' | 'bannerPicture') => {
    const options = {
      profilePicture: {
        title: strings('ProfilePicturesEdit.selectProfilePicture'),
        takePhotoButtonTitle: strings('ProfilePicturesEdit.takePhoto'),
        chooseFromLibraryButtonTitle: strings(
          'ProfilePicturesEdit.chooseFromLibrary',
        ),
      },
      bannerPicture: {
        title: strings('ProfilePicturesEdit.selectCoverPicture'),
        takePhotoButtonTitle: strings('ProfilePicturesEdit.takePhoto'),
        chooseFromLibraryButtonTitle: strings(
          'ProfilePicturesEdit.chooseFromLibrary',
        ),
      },
    };

    ImagePicker.showImagePicker(options[type], response => {
      if (response.data && response.uri) {
        setSelectedFiles({...selectedFiles, [type]: response.uri});

        const callback =
          type === 'profilePicture'
            ? props.onProfilePictureChange
            : props.onBannerPictureChange;
        if (callback) {
          callback(response);
        }
      }
    });
  };

  const profilePicture = selectedFiles.profilePicture || props.profilePicture;
  const bannerPicture = selectedFiles.bannerPicture || props.bannerPicture;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profilePictureContainer}
        onPress={() => openDialog('profilePicture')}>
        <Image
          source={
            profilePicture
              ? {uri: profilePicture}
              : require('../../assets/placeholders/profile_picture.png')
          }
          style={styles.profilePicture}
        />
        <Text style={styles.text}>
          {strings('ProfilePicturesEdit.changeProfilePicture')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profilePictureContainer}
        onPress={() => openDialog('bannerPicture')}>
        <Image
          source={
            bannerPicture
              ? {uri: bannerPicture}
              : require('../../assets/profileHeader.png')
          }
          style={styles.bannerPicture}
        />
        <Text style={styles.text}>
          {strings('ProfilePicturesEdit.changeCoverPicture')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
