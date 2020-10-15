import React, { useState } from 'react';
import {Linking} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOnboardingData,register } from '_actions/onBoarding';
import FinishReg from '_components/Onboarding/FinishReg';
import NavigationService from '_services/navigationService';


interface RegisterDataProps {
  accepts_terms: boolean;
  post_code: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  password: string;
  password_confirmation: string
}

interface EmailRegProps {
  goToLogin: () => void;
}


export default ({ goToLogin }) => {
  const dispatch = useDispatch();
  const data = useSelector(({ onboarding }) => onboarding);
  const loading: boolean = data.loading;

  next = async () => {
    try {
      const registerData: RegisterDataProps ={
        post_code: data.data.post_code,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        birth_date: data.data.birth_date,
        email: data.data.email,
        password: data.data.password,
        password_confirmation: data.data.password_confirmation,
        accepts_terms: true
      };
     dispatch(register(registerData));
    }
    catch (err) {
      return alert(err.message);
    }
  };

  
  openLink = (link: string) => {
   return Linking.openURL(link);
  };

  

  return (
    <FinishReg
      loading={loading}
      next={next}
      goToLogin={goToLogin}
      openLink={openLink}
    />
  );
};


