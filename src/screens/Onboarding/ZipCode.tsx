import React from 'react';
import ZipCode from '_containers/Onboarding/ZipCode';
import Header from '_components/Header';

export default (props) => {
  next = () => {
    props.navigation.navigate('NameReg')
  }
  goToLogin = () => {
    props.navigation.navigate('Login');
  };
  return <ZipCode next={next} goToLogin={goToLogin} />;  
};
