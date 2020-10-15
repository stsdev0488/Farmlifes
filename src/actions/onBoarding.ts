

import {
  REGISTER,
  ONBOARDING_IS_LOADING,
  SET_ONBOARDING_DATA,
  ONBOARDING_ERROR,
  ONBOARDING
} from './types';

export const register = (data) => ({
  type: REGISTER,
  data,
});

export const setOnboardingData = onboarding => ({
  type: SET_ONBOARDING_DATA,
  onboarding,
});


export const isLoading = bool => ({
  type: ONBOARDING_IS_LOADING,
  isLoading: bool,
});

export const isLoadingError = error => ({
  type: ONBOARDING_ERROR,
  error,
});


