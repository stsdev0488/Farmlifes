import React from 'react';
import DOBReg from '_containers/Onboarding/DOBReg';


export default (props) => {
  next = () => {
    props.navigation.navigate('EmailReg')
  }
  goToLogin = () => {
    props.navigation.navigate('Login');
  };

  return <DOBReg next={next} goToLogin={goToLogin}  />;
};
