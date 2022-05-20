import {
    RETRIEVE_REQUESTS,
    UPDATE_REQUEST,
} from "./types";
import AppointmentDataService from "../services/appointment.service";

export const approveAppointment = (id) => async (dispatch) => {
    try {
      const res = await AppointmentDataService.approve({ id });
      dispatch({
        type: UPDATE_REQUEST,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};
export const rejectAppointment = (id) => async (dispatch) => {
    try {
      const res = await AppointmentDataService.reject({ id });
      dispatch({
        type: UPDATE_REQUEST,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};


export const retrieveAppointments = () => async (dispatch) => {
    try {
      const res = await AppointmentDataService.getAll();
      dispatch({
        type: RETRIEVE_REQUESTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};
