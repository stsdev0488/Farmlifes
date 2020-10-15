import React from 'react';
import Login from '_containers/Login';

export default (props) => {


  goToRegister = () => {
    props.navigation.navigate('ZipCode')
  };

  return <Login goToRegister={goToRegister} />
};
