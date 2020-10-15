import React from 'react';
import NameReg from '_containers/Onboarding/NameReg';


export default (props) => {
  next = () => {
    props.navigation.navigate('DOBReg')
  }
  goToLogin = () => {
    props.navigation.navigate('Login');
  };
  return <NameReg next={next} goToLogin={goToLogin}  />;
};
