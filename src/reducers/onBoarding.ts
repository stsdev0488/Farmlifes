import {
  ONBOARDING_IS_LOADING,
  SET_ONBOARDING_DATA,
  REGISTER_FAILED,
  REGISTER_STARTED,
  REGISTERED
} from '../actions/types';

const onboardingReducer = (
  state = {
    data: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case SET_ONBOARDING_DATA:
      return { ...state,loading: false, data:{...state.data,...action.onboarding } };
    case ONBOARDING_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case REGISTER_STARTED:
      return { ...state, loading: true };
    case REGISTERED:
      return { ...state, loading: false };
    case REGISTER_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default onboardingReducer;