import {
    CREATE_HOUR,
    RETRIEVE_HOURS,
    UPDATE_HOUR,
    DELETE_HOUR
  } from "./types";

import HourDataService from "../services/hour.service";
export const createHour = (day, startHour, endHour) => async (dispatch) => {
    try {
      const res = await HourDataService.create({ day, startHour, endHour });
      dispatch({
        type: CREATE_HOUR,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

export const retrieveHours = () => async (dispatch) => {
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

export const updateHour = (id, data) => async (dispatch) => {
    try {
      const res = await HourDataService.update(id, data);
      dispatch({
        type: UPDATE_HOUR,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

export const deleteHour = (id) => async (dispatch) => {
    try {
      await HourDataService.delete(id);
      dispatch({
        type: DELETE_HOUR,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
};
export const findHoursByDay = (day) => async (dispatch) => {
    try {
      const res = await HourDataService.findByDay(day);
      dispatch({
        type: RETRIEVE_HOURS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};