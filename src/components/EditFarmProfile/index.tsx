import React, {useEffect, useState} from 'react';
import styles from './styles';
import ProfilePicturesEdit from '../ProfilePicturesEdit';
import Input from '../Input';
import Text from '../Text';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../../config/colors";
import AddressAutocompleteInput from '_components/AddressAutocompleteInput';
import Spinner from '../../components/Spinner';
import {strings} from '_utils/i18n';
import {View, ScrollView} from 'react-native';

const getDateOfBirthObject = (dateOfBirth: string) => {
  if (dateOfBirth === '') {
    return {year: '', month: '', day: ''}
  }

  const [year, month, day] = dateOfBirth.split('-');
  return {year, month, day};
};

export default (props: any): any => {
  const {farm, setFarm, errors} = props;
  const [dateOfBirth, setDateOfBirth] = useState(
    getDateOfBirthObject(farm.birth_date || ''),
  );
  const [displayErrors, setDisplayErrors] = useState(false);

  useEffect(() => {
    if (errors) {
      setDisplayErrors(true);
    }
  }, [errors]);

  const getOnFieldChange = (fieldName: string) => (newValue: any) => {
    setDisplayErrors(false);
    setFarm({...farm, [fieldName]: newValue});
  };

  const getOnPictureChange = (fieldName: string) => (response: any) => {
    getOnFieldChange(fieldName)(`data:image/jpeg;base64,${response.data}`);
  };

  const getDateOfBirthInputChange = (name: 'day' | 'month' | 'year') => (
    newValue: string,
  ) => {
    const newDateOfBirth = {...dateOfBirth, [name]: newValue};

    const {day, month, year} = newDateOfBirth;

    setFarm({...farm, 'birth_date': `${year}-${month}-${day}`});
    setDateOfBirth(newDateOfBirth);
  };

  const getString = (s: string): any => strings(`EditFarmProfile.${s}`);

  const getFieldError = fieldName => displayErrors && errors && errors[fieldName];

  if (props.isEditingFarm) {
    return <Spinner/>;
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <ProfilePicturesEdit
        profilePicture={farm && farm.profile_image && farm.profile_image.imageUrl}
        onProfilePictureChange={getOnFieldChange('new_profile_image')}
        bannerPicture={farm && farm.title_image && farm.title_image.imageUrl}
        onBannerPictureChange={getOnFieldChange('new_title_image')}
      />

      <View style={styles.nameInputsContainer}>
        <View style={{flex: 1}}>
          <Input
            placeholder={getString('nameOfYourFarm')}
            value={farm.name}
            onChangeText={getOnFieldChange('name')}
            style={styles.inputContainer}
            error={getFieldError('name')}
            errorMessage={getFieldError('name')}
          />
        </View>
      </View>

      <View style={styles.dateOfBirthContainer}>
        <View style={styles.dateOfBirthTextContainer}>
          <Text>{getString('areaInHa')}</Text>
        </View>
        <View style={styles.dateOfBirthInputsContainer}>
          <View style={styles.areaInputContainer}>
            <Input
              placeholder="50"
              value={farm.farm_area}
              onChangeText={getOnFieldChange('farm_area')}
              style={styles.dateOfBirthInputContainer}
              textStyle={styles.dateOfBirthInput}
              error={getFieldError('farm_area')}
              errorMessage={getFieldError('farm_area')}
            />
          </View>

          <View style={styles.membersInputContainer}>
            <Input
              placeholder={getString('8Members')}
              value={farm.members_count}
              onChangeText={getDateOfBirthInputChange('members_count')}
              style={styles.dateOfBirthInputContainer}
              textStyle={styles.dateOfBirthInput}
              error={getFieldError('members_count')}
              errorMessage={getFieldError('members_count')}
            />
          </View>
        </View>
      </View>

      <View style={styles.dateOfBirthContainer}>
        <View style={styles.dateOfBirthTextContainer}>
          <Text>{getString('categorie')}</Text>
        </View>

        <View style={styles.dateOfBirthInputsContainer}>
          <View style={{flex: 1, paddingRight: 50 }}>
            <RNPickerSelect
              placeholder={{
                label: getString('pleaseSelectACategory'),
                value: '',
                color: 'black'
              }}
              value={farm.farm_category_id}
              onValueChange={getOnFieldChange('farm_category_id')}
              Icon={() => <Icon name="chevron-down" color={colors.stainedWhite} size={15} />}
              items={props.categories.map(category => ({ label: strings(`FarmCategories.${category.name}`), value: category.id }))}
              style={{
                inputIOS: styles.selectInput,
                inputAndroid: styles.selectInput,
                iconContainer: styles.selectInputIcon,
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.addressInputContainer}>
        <AddressAutocompleteInput
          placeholder={strings('Common.address')}
          getDefaultValue={() => farm.adress}
          onAddressSelected={(data, details) => {
            getOnFieldChange('selected_address_data')(data);
            getOnFieldChange('selected_address_details')(details);
          }}
          error={getFieldError('adress')}
        />
      </View>

      <View style={styles.descriptionInputContainer}>
        <Input
          placeholder={`${getString('description')}...`}
          value={farm.description}
          multiline={true}
          numberOfLines={10}
          style={styles.descriptionInputInputContainer}
          textStyle={styles.descriptionInputTextStyle}
          onChangeText={getOnFieldChange('description')}
          error={getFieldError('description')}
          errorMessage={getFieldError('description')}
        />
      </View>
    </ScrollView>
  );
};
