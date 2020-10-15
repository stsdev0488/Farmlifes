import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImagePickerSelector from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';
import { createNewPost, startUpload, createNewPostFailed } from '../actions/feeds';

import CreatePost from '_components/CreatePost';

import { requestAttachmentToken } from '../services/api';

// React Native image picker
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  multiple: true,
};


export default ({ props }) => {

  const isOpenCamera = props;

  const dispatch = useDispatch();
  const feeds = useSelector(({ feeds }) => feeds);
  const userInfo = useSelector(({ user }) => user);


  const loading = feeds.loading;

  const [publisher, onChangePublisher] = useState('human');
  const [postText, onChangePostText] = useState('');
  const [typeOfPost, onChangeTypeOfPost] = useState('normal');
  const [attachment, onChangeAttachment] = useState('')

  const [formData, onChangeFormData] = useState('');

  const [imageUri, onChangeImageUri] = useState('');

  let [imageData, onChangeImageData] = useState([]);

  const onSubmit = async () => {

    try {
      let uploadResp = '';
      if (postText.length < 1 && imageUri === '') {
        return alert('Post can\'t be empty')
      }
      if (imageUri && imageUri.uri && imageUri.uri.length > 0) {
        dispatch(startUpload());
        uploadResp = await uploadImageToEndpoint();
        if (uploadResp === false) {
          dispatch(createNewPostFailed());
          return alert('failed')
        }
      }

      let reqData;

      if (publisher === 'human') {
        reqData = {
          attachment: uploadResp,
          read_more_url: '',
          text: postText,
          type: typeOfPost,
        };
      }

      else {
        reqData = {
          attachment: uploadResp,
          read_more_url: '',
          text: postText,
          type: typeOfPost,
          farm: true,
          farm_id: userInfo.user.user.farm_id
        };
      }

      dispatch(createNewPost(reqData));
    }
    catch (err) {
      dispatch(createNewPostFailed());
    }

  }

  const uploadImageToEndpoint = async () => {
    try {
      const resp = await requestAttachmentToken(formData, 'image');
      if (resp.status !== 201) {
        // Failed
        return false;
      }
      else {
        onChangeAttachment(resp.data.token);
        return resp.data.token;
      }

    }
    catch (err) {
      return false;
    }
  }



  useEffect(() => {
    if (props.navigation.state.params && props.navigation.state.params.openCamera) {
      launchCamera();
    }
    if (props.navigation.state.params && props.navigation.state.params.openGallery) {
      chooseImage();
    }
  }, [])

  launchCamera = () => {
    ImagePickerSelector.launchCamera(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        onChangeImageUri(source);

        const formDatum = new FormData();
        const composedData = {
          uri: response.uri,
          url: response.uri,
          type: response.type,
          name: response.fileName,
          originalname: response.fileName,
        }
        onChangeImageData(imageData.concat(composedData));

        formDatum.append('file', composedData);

        onChangeFormData(formDatum);
      }
    });
  }

  const removePicture=(id) => {
    const newData = imageData.filter(c => c.id === id );
    onChangeImageData(newData);
  }
  chooseImage = () => {

    ImagePicker.openPicker({
      multiple: true
    }).then(images => {

      const responseImages = images.map((c,i)=> {
        c.index =i;
        c.url = c.path;
        return c;
      });

      onChangeImageData(responseImages.concat(imageData));
      
      const response = images[0];
      const source = { uri: response.path };
      onChangeImageUri(source);

      const formDatum = new FormData();

      formDatum.append('file', {
        uri: response.path,
        type: response.mime,
        name: response.modificationDate,
        originalname: response.modificationDate,
      });

      onChangeFormData(formDatum);
    })
      .catch(err => {
        console.log('error', err.message);
      });


     
    // };

    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const source = { uri: response.uri };
    //     onChangeImageUri(source);

    //     const formDatum = new FormData();

    //     formDatum.append('file', {
    //       uri: response.uri,
    //       type: response.type,
    //       name: response.fileName,
    //       originalname: response.fileName,
    //     });

    //     onChangeFormData(formDatum);
    //   }
    // });


  };

  const state = {
    postText,
    onChangePostText,
    typeOfPost,
    onChangeTypeOfPost,
    publisher,
    onChangePublisher,
    onSubmit,
    loading,
    publisher,
  }


  return (
    <CreatePost
      props={props}
      state={state}
      imageUri={imageUri}
      chooseImage={chooseImage}
      userInfo={userInfo.user}
      imageData={imageData}
      removePicture={removePicture}
    />
  );
};
