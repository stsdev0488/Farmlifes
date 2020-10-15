import React from 'react';
import PasswordReg from '_containers/Onboarding/PasswordReg';


export default (props) => {
  next = () => {
    props.navigation.navigate('FinishReg')
  }
  goToLogin = () => {
    props.navigation.navigate('Login');
  };
  return <PasswordReg next={next} goToLogin={goToLogin}  />;
};
