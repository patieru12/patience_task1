import {
    CREATE_REQUEST,
    RETRIEVE_REQUESTS,
    UPDATE_REQUEST,
    DELETE_REQUEST,
} from "../actions/types";
  
const initialState = [];
function AppointmentReducer(appointments = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_REQUEST:
        return [...appointments, payload];
      case RETRIEVE_REQUESTS:
        return payload;
      case UPDATE_REQUEST:
        return appointments.map((appointment) => {
          if (appointment.id === payload.id) {
            return {
              ...appointment,
              ...payload,
            };
          } else {
            return appointment;
          }
        });
      case DELETE_REQUEST:
        return appointments.filter(({ id }) => id !== payload.id);
      default:
        return appointments; 
    }
};
export default AppointmentReducer;
  