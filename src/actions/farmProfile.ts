import {
  GET_FARM,
  GET_FARM_SUCCESS,
  GET_FARM_FAILURE,
  GET_FARM_MEMBERS,
} from './types';

interface Action {
  type: string;
  [key: string]: any;
}

export const getFarm = (farmId: number): Action => ({
  type: GET_FARM,
  farmId,
});

export const getFarmSuccess = (farm: any): Action => ({
  type: GET_FARM_SUCCESS,
  farm,
});

export const getFarmFailure = (error: any): Action => ({
  type: GET_FARM_FAILURE,
  error,
});

export const getFarmMembers = (farmId, page) => ({
  type: GET_FARM_MEMBERS,
  farmId,
  page,
});
