import {
    CREATE_DOCTOR,
    RETRIEVE_DOCTORS,
    RETRIEVE_HOURS,
    UPDATE_DOCTOR,
    DELETE_DOCTOR,
    CREATE_REQUEST,
    DELETE_REQUEST,
  } from "./types";

import DoctorDataService from "../services/doctor.service";
import HourDataService from "../services/hour.service";
import ClientRequestDataService from "../services/client.service";

export const createDoctor = (name, phoneNumber) => async (dispatch) => {
    try {
      const res = await DoctorDataService.create({ name, phoneNumber });
      dispatch({
        type: CREATE_DOCTOR,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};


export const createRequest = (time, doctorId) => async (dispatch) => {
    try {
      const res = await ClientRequestDataService.create({ time, doctorId });
      dispatch({
        type: CREATE_REQUEST,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};
export const retrieveDoctors = () => async (dispatch) => {
    try {
      const res = await DoctorDataService.getAll();
      dispatch({
        type: RETRIEVE_DOCTORS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

export const retrieveAvailableHours = () => async (dispatch) => {
    try {
      const res = await HourDataService.getAll();
      dispatch({
        type: RETRIEVE_HOURS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

export const updateDoctor = (id, data) => async (dispatch) => {
    try {
      const res = await DoctorDataService.update(id, data);
      dispatch({
        type: UPDATE_DOCTOR,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

export const deleteDoctor = (id) => async (dispatch) => {
    try {
      await DoctorDataService.delete(id);
      dispatch({
        type: DELETE_DOCTOR,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
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
export const findDoctorsByName = (name) => async (dispatch) => {
    try {
      const res = await DoctorDataService.findByName(name);
      dispatch({
        type: RETRIEVE_DOCTORS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};