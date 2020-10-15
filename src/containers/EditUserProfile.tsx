import React, {useEffect, useState} from 'react';
import EditUserProfile from '../components/EditUserProfile';
import ScreenHeaderWithActions from '_components/ScreenHeaderWithActions';
import Spinner from '../components/Spinner';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {strings} from '../utils/i18n';
import {GET_MY_USER, EDIT_MY_USER, VERIFY_EMAIL} from '../actions/types';
import {showMessage} from 'react-native-flash-message';
import {getProfileUser} from '../actions/profile';

const getDataFromUser = user => {
  let data: {[k: string]: any} = {};

  data = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    description: user.description,
    avatar: user.newAvatar || '',
    cover: user.newCover || '',
    birth_date: user.birth_date,
    gender: user.gender,
    email: user.email,
    address: user.address,
  };

  if (user.password) {
    data.password = user.password;
  }
  if (user.password_confirmation) {
    data.password_confirmation = user.pasword_confirmation;
  }
  if (user.old_password) {
    data.old_password = user.old_password;
  }

  return data;
};

const userIsValid = user => {
  if (!user) {
    return false;
  }

  let errorMessage = null;

  if (user.birth_date_split) {
    const {day, month, year} = user.birth_date_split;
    const floatDay = parseFloat(day);
    const floatMonth = parseFloat(month);
    const floatYear = parseFloat(year);

    if (day.length !== 2 || floatDay < 0 || floatDay > 31) {
      errorMessage = strings('EditUserProfile.pleaseEnterAValidBirthDate');
    } else if (month.length !== 2 || floatMonth < 0 || floatMonth > 12) {
      errorMessage = strings('EditUserProfile.pleaseEnterAValidBirthMonth');
    } else if (year.length !== 4 || floatYear < 1900 || floatYear > 2010) {
      errorMessage = strings('EditUserProfile.pleaseEnterAValidBirthYear');
    }
  }

  if (!user.first_name) {
    errorMessage = strings('EditUserProfile.pleaseEnterYourFirstName');
  } else if (!user.last_name) {
    errorMessage = strings('EditUserProfile.pleaseEnterYourLastName');
  }

  if (user.password || user.password_confirmation) {
    if (user.password_confirmation !== user.password) {
      errorMessage = strings('EditUserProfile.passwordConfirmationNotMatching');
    } else if (!user.old_password || user.old_password === '') {
      errorMessage = strings('EditUserProfile.pleaseEnterYourCurrentPassword');
    }
  }

  if (errorMessage) {
    alert(errorMessage);
  }

  return !errorMessage;
};

export default ({props}) => {
  const dispatch = useDispatch();
  const {
    loading,
    myUser,
    isEditingUser,
    editUserSuccess,
    isVerifyingEmail,
  } = useSelector(state => state.user);
  const [initialized, setInitialized] = useState(false);

  const [newUser, setNewUser] = useState(myUser);

  useEffect(() => {
    setNewUser(myUser);
  }, [myUser]);

  useEffect(() => {
    dispatch({type: GET_MY_USER});
  }, []);

  useEffect(() => {
    if (editUserSuccess && initialized) {
      dispatch(getProfileUser(myUser.id));

      showMessage({
        message: strings('Common.success'),
        description: strings('EditUserProfile.profileEdited'),
        type: 'success',
        hideOnPress: true,
      });

      // Go back after editing the profile
      props.navigation.goBack();
    }
  }, [editUserSuccess, initialized]);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const onPressSave = props => {
    const data = getDataFromUser(newUser);

    const dataIsValid = userIsValid(newUser);

    if (dataIsValid) {
      dispatch({type: EDIT_MY_USER, user: data});
    }
  };

  if (loading || !newUser) {
    return <Spinner />;
  }

  const onConfirmEmailPress = () => {
    dispatch({
      type: VERIFY_EMAIL,
      data: {userId: myUser.id, email: myUser.email},
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScreenHeaderWithActions
        title={strings('EditUserProfile.editProfile')}
        leftText={strings('Common.abort')}
        rightText={strings('Common.save')}
        onRightTextPress={onPressSave}
      />
      <EditUserProfile
        props={props}
        user={newUser}
        setUser={setNewUser}
        isEditingUser={isEditingUser}
        isVerifyingEmail={isVerifyingEmail}
        onConfirmEmailPress={onConfirmEmailPress}
      />
    </View>
  );
};
