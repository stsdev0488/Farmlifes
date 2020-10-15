import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';

interface AuthLoadingProps {
  goToLogin: () => void;
  goToHome: () => void;
}

export default ({ goToLogin,goToHome  }): React.FC<AuthLoadinProps> => {
  const user: any = useSelector(state => state.user.user);

  useEffect(()=>{
    getKey();
  },[])

  getKey = async() => {
    SplashScreen.hide();
    try {
      if (user !== null) return goToHome();
      return goToLogin();
    } catch(e) {
      return goToLogin();
    }
  };

  return null;
};
