import React, { useState, useEffect  }  from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOnboardingData } from '_actions/onBoarding';
import EmailReg from '_components/Onboarding/EmailReg';
import { isEmail } from '_services/helpers';

interface EmailRegProps {
  next: () => void;
  goToLogin: () => void;
}

// tslint:disable-next-line:no-unused-expression
export default ({ next, goToLogin }): React.FC<EmailProps> => {

  const dispatch = useDispatch();
  const data = useSelector(({ onboarding }) => onboarding);
  const [email, onEmailChanged] = useState(data.data && data.data.email);
  const [error, setError] = useState({
    status: false,
    errorMessage: '',
  });
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
    if (email === '') {
      return setError({
        status: true,
        errorMessage: strings('EmailReg.pleaseEnterYourEmail'),
      });
    }
    if (!isEmail(email)) {
      return setError({
        status: true,
        errorMessage: strings('EmailReg.emailNotValid'),
      });
    }
    dispatch(setOnboardingData({ email }));
    return next();
  }

  return(
    <EmailReg
      next={goTo}
      onEmailChanged={onEmailChanged}
      error={error}
      email={email}
      setError={setError}
      goToLogin={goToLogin}
      shift={shift}
    />
  );
};
