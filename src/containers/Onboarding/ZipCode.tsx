import React, { useState,useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { setOnboardingData } from '_actions/onBoarding';
import {strings} from '../../utils/i18n';
import ZipCode from '_components/Onboarding/ZipCode';

interface ZipCodeProps {
  next: () => void;
  goToLogin: () => void;
}

// tslint:disable-next-line:no-unused-expression
export default ({ next,goToLogin }): React.FC<ZipCodeProps> => {

  const dispatch = useDispatch();
  const data = useSelector(({ onboarding }) => onboarding);

  const [shift, onShiftChanged] = useState(false);
  const [zipCode, onZipCodeChanged] = useState('');
  const [error, setError] = useState({
    status: false,
    errorMessage: '',
  });

  let keyboardDidShowSub;
  let keyboardDidHideSub;

  useEffect(() => {
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', keyboardHide);
  },[])


  keyboardDidShow = () => {
    onShiftChanged(true)
  }

  keyboardHide = () => {
    onShiftChanged(false)
  }

  goTo = () => {
    if (zipCode === '' ) {
      return setError({
        status: true,
        errorMessage: strings('ZipCode.zipCodeCantBeEmpty'),
      });
    }
    if( zipCode && zipCode.length < 4){
      return setError({
        status: true,
        errorMessage: strings('ZipCode.minimumOfFourCharacters'),
      });
    }
    if (zipCode < 100) {
      return setError({
        status: true,
        errorMessage: strings('ZipCode.invalidZipCode'),
      });
    }
    if (isNaN(zipCode)){
      return setError({
        status: true,
        errorMessage: strings('ZipCode.invalidZipCode'),
      });
    }


    dispatch(setOnboardingData({ post_code : zipCode }))
    return next();
  }

  return (
    <ZipCode
      next={goTo}
      onZipCodeChanged={onZipCodeChanged}
      error={error}
      zipCode={zipCode}
      setError={setError}
      goToLogin={goToLogin}
      shift={shift}
    />
  );
};
