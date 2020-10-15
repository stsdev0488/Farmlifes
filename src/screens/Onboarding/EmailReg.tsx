import React from 'react';
import EmailReg from '_containers/Onboarding/EmailReg';


export default (props) => {
  next = () => {
    props.navigation.navigate('PasswordReg')
  };
  goToLogin = () => {
    props.navigation.navigate('Login');
  };
  return <EmailReg next={next} goToLogin={goToLogin}  />;
};
