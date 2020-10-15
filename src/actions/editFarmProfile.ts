import {
  GET_EDIT_FARM,
  GET_EDIT_FARM_SUCCESS,
  GET_EDIT_FARM_FAILURE,
} from './types';

interface Action {
  type: string;
  [key: string]: any;
}

export const getEditFarm = (farmId: number): Action => ({
  type: GET_EDIT_FARM,
  farmId,
});

export const getEditFarmSuccess = (farm: any): Action => ({
  type: GET_EDIT_FARM_SUCCESS,
  farm,
});

export const getEditFarmFailure = (error: any): Action => ({
  type: GET_EDIT_FARM_FAILURE,
  error,
});
