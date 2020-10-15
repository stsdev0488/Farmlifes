import {Platform, Dimensions} from 'react-native';
import {strings} from '../utils/i18n';

const {height} = Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';

export const extraSmallScreen = height < 568;
export const smallScreen = height < 667;

export const toCapitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const isEmail = value => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);

export const removeDuplicatesFromArray = data => [...new Set(data)];

export const loginValidation = (email: string, password: string) => {
  if (email === null) {
    return {
      status: true,
      passwordError: null,
      emailError: {
        status: true,
        message: strings('Login.pleaseEnterYourEmail'),
      },
    };
  }

  if (password === null) {
    return {
      status: true,
      passwordError: null,
      emailError: {
        status: true,
        message: strings('Login.pleaseEnterYourPassword'),
      },
    };
  }

  if (email.length === 0 && password.length === 0) {
    return {
      status: true,
      passwordError: {
        status: true,
        message: strings('Login.pleaseEnterYourPassword'),
      },
      emailError: {
        status: true,
        message: strings('Login.pleaseEnterYourEmail'),
      },
    };
  } else if (email.length === 0) {
    return {
      status: true,
      passwordError: null,
      emailError: {
        status: true,
        message: strings('Login.pleaseEnterYourEmail'),
      },
    };
  } else if (password.length === 0) {
    return {
      status: true,
      passwordError: {
        status: true,
        message: strings('Login.pleaseEnterYourPassword'),
      },
      emailError: null,
    };
  } else if (!isEmail(email)) {
    return {
      status: true,
      emailError: {
        status: true,
        message: 'Invalid email',
      },
    };
  }

  return {
    status: false,
    emailError: null,
    passwordError: null,
  };
};
