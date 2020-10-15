import React, { useState, useEffect  } from 'react';
import PasswordReg from '_components/Onboarding/PasswordReg';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {setOnboardingData} from '_actions/onBoarding';
import {strings} from '../../utils/i18n';


interface PasswordRegProps {
  next: () => void;
  goToLogin: () => void;
}
// tslint:disable-next-line:no-unused-expression
export default ({ next,goToLogin }): React.FC<PasswordRegProps> => {

  const dispatch = useDispatch();
  let [password, onPasswordChanged] = useState('');
  const [error, setError] = useState({
    status: false,
    errorMessage: '',
  });
  const [passwordVisibility, setPasswordVisiblity] = useState(false);

  const [shift, onShiftChanged] = useState(false);

  let keyboardDidShowSub;
  let keyboardDidHideSub;

  useEffect(() => {
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', keyboardHide);
  }, [])

  keyboardDidShow = () => {
    onShiftChanged(true)
  }

  keyboardHide = () => {
    onShiftChanged(false)
  }

  goTo = () => {
    password= password.trim('')
    if (password === '') {
      return setError({
        status: true,
        errorMessage: strings('PasswordReg.minimumOf8Characters'),
      });
    }
    if (password && password.length < 8) {
      return setError({
        status: true,
        errorMessage: strings('PasswordReg.minimumOf8Characters'),
      });
    }
    dispatch(setOnboardingData({ password, password_confirmation: password}));
    return next();
  }

  return (
    <PasswordReg
      next={goTo}
      onPasswordChanged={onPasswordChanged}
      error={error}
      password={password}
      setError={setError}
      passwordVisibility={passwordVisibility}
      setPasswordVisibility={setPasswordVisiblity}
      goToLogin={goToLogin}
      shift={shift}
     />
  );
};
