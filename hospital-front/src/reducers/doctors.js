import {
    CREATE_DOCTOR,
    RETRIEVE_DOCTORS,
    UPDATE_DOCTOR,
    DELETE_DOCTOR,
  } from "../actions/types";
  const initialState = [];
  function doctorReducer(doctors = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_DOCTOR:
        return [...doctors, payload];
      case RETRIEVE_DOCTORS:
        return payload;
      case UPDATE_DOCTOR:
        return doctors.map((doctor) => {
          if (doctor.id === payload.id) {
            return {
              ...doctor,
              ...payload,
            };
          } else {
            return doctor;
          }
        });
      case DELETE_DOCTOR:
        return doctors.filter(({ id }) => id !== payload.id);
      default:
        return doctors;
    }
  };
  export default doctorReducer;
  