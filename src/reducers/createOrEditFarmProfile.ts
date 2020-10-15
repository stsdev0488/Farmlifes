import {
  GET_EDIT_FARM,
  GET_EDIT_FARM_SUCCESS,
  GET_EDIT_FARM_FAILURE,
  GET_FARM_CATEGORIES_SUCCESS,
  CREATE_OR_EDIT_FARM,
  CREATE_OR_EDIT_FARM_SUCCESS,
  CREATE_OR_EDIT_FARM_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  farm: null,
  loading: false,
  error: null,
  categories: [],
  isEditingFarm: false,
  createOrEditFarmSuccess: false,
};

interface State {
  farm: object | null;
  loading: boolean;
  error: any;
  categories: any;
  isEditingFarm: boolean;
  createOrEditFarmSuccess: boolean;
}

interface Action {
  type: string;
  categories: any;
  [key: string]: any;
}

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case GET_EDIT_FARM:
      return {
        ...state,
        loading: true,
        farm: null,
        createOrEditFarmSuccess: false,
      };
    case GET_EDIT_FARM_SUCCESS:
      return {...state, loading: false, farm: action.farm};
    case GET_EDIT_FARM_FAILURE:
      return {...state, loading: false, error: true};
    case GET_FARM_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories};
    case CREATE_OR_EDIT_FARM:
      return {
        ...state,
        isEditingFarm: true,
        error: null,
        createOrEditFarmSuccess: false,
      };
    case CREATE_OR_EDIT_FARM_SUCCESS:
      return {
        ...state,
        isEditingFarm: false,
        createOrEditFarmSuccess: true,
        farm: action.farm,
      };
    case CREATE_OR_EDIT_FARM_FAILURE:
      return {...state, isEditingFarm: false, error: action.error};
    default:
      return state;
  }
};
