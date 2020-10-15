import React from 'react';
import FinishReg from '_containers/Onboarding/FinishReg';

export default (props) => {
  goToLogin = () => {
    props.navigation.navigate('Login');
  };
  return <FinishReg goToLogin={goToLogin}  />;
};
