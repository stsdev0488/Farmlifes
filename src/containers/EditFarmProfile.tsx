import React, {useEffect, useState} from 'react';
import EditFarmProfile from '../components/EditFarmProfile';
import ScreenHeaderWithActions from '_components/ScreenHeaderWithActions';
import Spinner from '../components/Spinner';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {strings} from '../utils/i18n';
import {
  GET_EDIT_FARM,
  GET_FARM_CATEGORIES,
  CREATE_OR_EDIT_FARM,
} from '../actions/types';
import {showMessage} from 'react-native-flash-message';
import {getFarm} from '../actions/farmProfile';

const defaultFarm = {
  name: '',
  farm_area: '',
  description: '',
  adress: '',
  farm_category_id: '',
};

const convertFarmToData = farm => {
  let data = {
    id: farm.id,
    profile_image: farm.new_profile_image || '',
    title_image: farm.new_title_image || '',
    name: farm.name,
    farm_area: farm.farm_area,
    description: farm.description,
    adress: farm.adress,
    city: '',
    post_code: '',
    full_address: '',
    location: `${farm.lat} ${farm.lng}`,
    farm_category_id: farm.farm_category_id,
  };

  if (farm.selected_address_details) {
    const details = farm.selected_address_details;

    if (Array.isArray(details.address_components)) {
      details.address_components.forEach(component => {
        if (Array.isArray(component.types)) {
          component.types.forEach(type => {
            switch (type) {
              case 'postal_code':
                data['post_code'] = component.long_name || component.short_name;
                break;
              case 'locality':
                data['city'] = component.long_name || component.short_name;
                break;
            }
          });
        }
      });
    }

    if (details.geometry && details.geometry.location) {
      data['location'] = `${details.geometry.location.lat} ${details.geometry.location.lng}`;
    }

    data['adress'] = details.formatted_address;
    data['full_address'] = details.formatted_address;
  }

  return data;
};

const validateFarmData = data => {
  const farmCategoryId = data.farm_category_id;

  if (!farmCategoryId || farmCategoryId === '') {
    return strings('EditFarmProfile.pleaseSelectACategory');
  }
};

const getNiceErrors = error => {
  if (!error) {
    return error;
  }

  const errors: {[k: string]: any} = {};

  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.errors
  ) {
    Object.keys(error.response.data.errors).forEach(fieldName => {
      errors[fieldName] = error.response.data.errors[fieldName][0];
    });
  }

  return errors;
};

export default ({props}) => {
  const dispatch = useDispatch();
  const createOrEditFarmProfile = useSelector(state => state.createOrEditFarmProfile);
  const {
    loading,
    categories,
    isEditingFarm,
    createOrEditFarmSuccess,
    farm: createdFarm,
    error,
  } = createOrEditFarmProfile;

  const farmId = props.navigation.getParam('farmId');
  const farm = farmId ? createOrEditFarmProfile.farm : defaultFarm;

  const [newFarm, setNewFarm] = useState(farm);
  const [niceErrors, setNiceErrors] = useState(getNiceErrors(error));

  useEffect(() => {
    setNewFarm(farm);
  }, [farm]);

  useEffect(() => {
    setNiceErrors(getNiceErrors(error));
  }, [error]);

  useEffect(() => {
    if (farmId) {
      dispatch({type: GET_EDIT_FARM, farmId});
    }

    dispatch({type: GET_FARM_CATEGORIES});
  }, []);

  useEffect(() => {
    if (createOrEditFarmSuccess) {
      dispatch(getFarm(farmId || createdFarm.id));

      showMessage({
        message: strings('Common.success'),
        description: strings(
          `EditFarmProfile.farm${farmId ? 'Edited' : 'Created'}`,
        ),
        type: 'success',
        hideOnPress: true,
      });

      if (farmId) {
        props.navigation.goBack();
      } else {
        props.navigation.replace('FarmProfile', {farmId: createdFarm.id});
      }
    }
  }, [createOrEditFarmSuccess, farmId, createdFarm]);

  if (loading || !newFarm) {
    return <Spinner/>;
  }

  const onSavePress = () => {
    const data = convertFarmToData(newFarm);

    const errorMessage = validateFarmData(data);

    if (errorMessage) {
      showMessage({
        message: strings('Error.error'),
        description: errorMessage,
        type: 'danger',
        hideOnPress: true,
      });
    } else {
      dispatch({type: CREATE_OR_EDIT_FARM, farm: convertFarmToData(newFarm)});
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScreenHeaderWithActions
        title={strings(`EditFarmProfile.${farmId ? 'edit' : 'create'}Farm`)}
        leftText={strings('Common.abort')}
        rightText={strings('Common.save')}
        onRightTextPress={onSavePress}
      />
      <EditFarmProfile
        props={props}
        farm={newFarm}
        setFarm={setNewFarm}
        categories={categories}
        isEditingFarm={isEditingFarm}
        errors={niceErrors}
      />
    </View>
  );
};
