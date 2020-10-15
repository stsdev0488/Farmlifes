import React, { useState,useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import { setOnboardingData } from '_actions/onBoarding';
import NameReg from '_components/Onboarding/NameReg';


interface NameRegProps {
  next: () => void;
  goToLogin: () => void;
}

export default ({ next,goToLogin }): React.FC<NameRegProps> => {

  const dispatch = useDispatch();
  const data = useSelector(({ onboarding }) => onboarding);
  const [name, onNameChanged] = useState(data.data && data.data.first_name);
  const [nameError, setNameError] = useState({
    status: false,
    nameErrorMessage: '',
  });
  const [surName, onSurNameChanged] = useState(data.data && data.data.last_name);
  const [surNameError, setSurNameError] = useState({
    status: false,
    surNameErrorMessage: '',
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

    if (name ===  undefined && surName === undefined ) {
      setNameError({
        status: true,
        errorMessage: strings('NameReg.nameCantBeEmpty'),
      });
      return setSurNameError({
        status: true,
        errorMessage: strings('NameReg.surnameCantBeEmpty'),
      });
    }

    if (name === '' && surName === '') {
      setNameError({
        status: true,
        errorMessage: strings('NameReg.nameCantBeEmpty'),
      });
      return setSurNameError({
        status: true,
        errorMessage: strings('NameReg.surnameCantBeEmpty'),
      });
    }

    if (name === '' ||  name === undefined) {
      return setNameError({
        status: true,
        errorMessage: strings('NameReg.nameCantBeEmpty'),
      });
    }
    if (surName === '' || surName === undefined) {
      return setSurNameError({
        status: true,
        errorMessage: strings('NameReg.surnameCantBeEmpty'),
      });
    }
    dispatch(setOnboardingData({ first_name: name ,last_name: surName}))
    return next();
  }

  return(
    <NameReg
      next={goTo}
      onNameChanged={onNameChanged}
      nameError={nameError}
      name={name}
      setNameError={setNameError}

      onSurNameChanged={onSurNameChanged}
      surNameError={surNameError}
      surName={surName}
      setSurNameError={setSurNameError}
      goToLogin={goToLogin}
      shift={shift}
    />
  );
};
