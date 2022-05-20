import {
    CREATE_REQUEST,
    RETRIEVE_REQUESTS,
    UPDATE_REQUEST,
    DELETE_REQUEST,
} from "./types";

import ClientRequestDataService from "../services/client.service";
export const createClientRequest = (doctorId, time) => async (dispatch) => {
    try {
      const res = await ClientRequestDataService.create({ doctorId, time });
      dispatch({
        type: CREATE_REQUEST,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

export const retrieveRequests = () => async (dispatch) => {
    try {
      const res = await ClientRequestDataService.getAll();
      dispatch({
        type: RETRIEVE_REQUESTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

export const updateRequest = (id, data) => async (dispatch) => {
    try {
      const res = await ClientRequestDataService.update(id, data);
      dispatch({
        type: UPDATE_REQUEST,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

export const deleteRequest = (id) => async (dispatch) => {
    try {
      await ClientRequestDataService.delete(id);
      dispatch({
        type: DELETE_REQUEST,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
};