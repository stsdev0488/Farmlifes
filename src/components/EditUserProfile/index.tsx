import React, {useEffect, useState} from 'react';
import styles from './styles';
import ProfilePicturesEdit from '../ProfilePicturesEdit';
import Input from '../Input';
import Text from '../Text';
import Button from '../Button';
import AddressAutocompleteInput from '_components/AddressAutocompleteInput';
import Spinner from '../../components/Spinner';
import colors from '../../config/colors';
import {strings} from '_utils/i18n';
import ScreenHeaderWithActions from '../ScreenHeaderWithActions';
import {CheckBox} from 'native-base';
import {View, ScrollView, TouchableOpacity} from 'react-native';

const getDateOfBirthObject = (dateOfBirth: string) => {
  if (dateOfBirth === '') {
    return {year: '', month: '', day: ''}
  }

  const [year, month, day] = dateOfBirth.split('-');
  return {year, month, day};
};

export default (props: any): any => {
  const {user, setUser} = props;

  const dateOfBirth = getDateOfBirthObject(user.birth_date || '');

  const getOnFieldChange = (fieldName: string) => (newValue: any) => {
    setUser({...user, [fieldName]: newValue});
  };

  const getDateOfBirthInputChange = (name: 'day' | 'month' | 'year') => (
    newValue: string,
  ) => {
    const newDateOfBirth = {...dateOfBirth, [name]: newValue};

    const {day, month, year} = newDateOfBirth;

    setUser({
      ...user,
      'birth_date': `${year}-${month}-${day}`,
      'birth_date_split': newDateOfBirth
    });
  };

  const getString = (s: string): any => strings(`EditUserProfile.${s}`);

  if (props.isEditingUser) {
    return <Spinner/>;
  }

  const GenderCheckBox = ({ gender, label = null }) => (
    <TouchableOpacity
      onPress={() => setUser({...user, gender})}
      style={styles.checkBoxInputContainer}>
      <CheckBox
        style={[
          styles.checkBoxContainer,
          user.gender === gender ? styles.activeCheckBox : null,
        ]}
        checked={user.gender === gender}
        color={user.gender === gender ? colors.thickGreen : colors.white}
        disabled={true}
      />
      <Text style={styles.checkBoxLabel}>{label || gender}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <ProfilePicturesEdit
        profilePicture={user && user.avatar}
        bannerPicture={user && user.cover}
        onProfilePictureChange={getOnFieldChange('newAvatar')}
        onBannerPictureChange={getOnFieldChange('newCover')}
      />

      <View style={styles.nameInputsContainer}>
        <View style={styles.prenameInputContainer}>
          <Input
            placeholder={getString('first_name')}
            value={user.first_name}
            onChangeText={getOnFieldChange('first_name')}
            style={styles.inputContainer}
          />
        </View>

        <View style={styles.surnameInputContainer}>
          <Input
            placeholder={getString('last_name')}
            value={user.last_name}
            onChangeText={getOnFieldChange('last_name')}
            style={styles.inputContainer}
          />
        </View>
      </View>

      <View style={styles.addressInputContainer}>
        <AddressAutocompleteInput
          placeholder={strings('Common.address')}
          getDefaultValue={() => user.address || ''}
          onAddressSelected={(data, details) => {
            getOnFieldChange('address')(details.formatted_address);
          }}
        />
      </View>

      <View style={[styles.dateOfBirthContainer, {marginTop: 40}]}>
        <View style={styles.dateOfBirthTextContainer}>
          <Text>{getString('dateOfBirth')}</Text>
        </View>
        <View style={styles.dateOfBirthInputsContainer}>
          <View style={styles.dateOfBirthDateInputContainer}>
            <Input
              placeholder="TT"
              value={dateOfBirth.day}
              maxLength={2}
              onChangeText={getDateOfBirthInputChange('day')}
              style={styles.dateOfBirthInputContainer}
              textStyle={styles.dateOfBirthInput}
            />
          </View>

          <View style={styles.dateOfBirthMonthInputContainer}>
            <Input
              placeholder="MM"
              value={dateOfBirth.month}
              maxLength={2}
              onChangeText={getDateOfBirthInputChange('month')}
              style={styles.dateOfBirthInputContainer}
              textStyle={styles.dateOfBirthInput}
            />
          </View>

          <View style={styles.dateOfBirthYearInputContainer}>
            <Input
              placeholder="JJJJ"
              value={dateOfBirth.year}
              maxLength={4}
              onChangeText={getDateOfBirthInputChange('year')}
              style={styles.dateOfBirthInputContainer}
              textStyle={styles.dateOfBirthInput}
            />
          </View>
        </View>
      </View>

      <View style={[styles.dateOfBirthContainer, {marginTop: 25}]}>
        <View style={styles.dateOfBirthTextContainer}>
          <Text>{getString('gender')}</Text>
        </View>

        <View style={styles.dateOfBirthInputsContainer}>
          <GenderCheckBox gender="F" label={getString('female')} />
          <GenderCheckBox gender="M" label={getString('male')} />
          <GenderCheckBox gender="O" label={getString('other')} />
        </View>
      </View>

      <View style={styles.descriptionInputContainer}>
        <Input
          placeholder={`${getString('description')}...`}
          value={user.description}
          multiline={true}
          numberOfLines={10}
          style={styles.descriptionInputInputContainer}
          textStyle={styles.descriptionInputTextStyle}
          onChangeText={getOnFieldChange('description')}
        />
      </View>

      <View style={{marginTop: 20}}>
        {!user.email_verified_at && (
          <Text style={styles.emailErrorText}>{getString('yourEmailAddressIsNotConfirmed')}</Text>
        )}

        <View style={styles.emailConfirmationContainer}>
          <View style={{flex: 2, marginRight: 10}}>
            <Input
              placeholder={strings('Common.email')}
              value={user.email}
              onChangeText={getOnFieldChange('email')}
            />
          </View>

          {!user.email_verified_at && (
            <View style={{flex: 1}}>
              <Button
                style={styles.confirmEmailButton}
                fontStyle={styles.confirmEmailButtonText}
                text={getString('confirm')}
                loading={props.isVerifyingEmail}
                onPress={props.onConfirmEmailPress}
              />
            </View>
          )}
        </View>
      </View>

      <View style={[styles.passwordInputContainer, {marginTop: 30}]}>
        <Text style={styles.passwordInputLabel}>{getString('newPassword')}</Text>
        <Input
          secureTextEntry={true}
          autoCompleteType="password"
          placeholder={getString('newPassword')}
          onChangeText={getOnFieldChange('password')}
        />
      </View>

      <View style={styles.passwordInputContainer}>
        <Text style={styles.passwordInputLabel}>{getString('newPasswordConfirmation')}</Text>
        <Input
          secureTextEntry={true}
          autoCompleteType="password"
          placeholder={getString('newPasswordConfirmation')}
          onChangeText={getOnFieldChange('password_confirmation')}
        />
      </View>

      <View style={[styles.passwordInputContainer, {marginBottom: 50,}]}>
        <Text style={styles.passwordInputLabel}>{getString('currentPassword')}</Text>
        <Input
          secureTextEntry={true}
          autoCompleteType="password"
          placeholder={getString('currentPassword')}
          onChangeText={getOnFieldChange('old_password')}
        />
      </View>
    </ScrollView>
  );
};
