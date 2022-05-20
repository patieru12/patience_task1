import {
    CREATE_HOUR,
    RETRIEVE_HOURS,
    UPDATE_HOUR,
    DELETE_HOUR,
  } from "../actions/types";
  const initialState = [];
  function hourReducer(hours = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_HOUR:
        return [...hours, payload];
      case RETRIEVE_HOURS:
        return payload;
      case UPDATE_HOUR:
        return hours.map((hour) => {
          if (hour.id === payload.id) {
            return {
              ...hour,
              ...payload,
            };
          } else {
            return hour;
          }
        });
      case DELETE_HOUR:
        return hours.filter(({ id }) => id !== payload.id);
      default:
        return hours;
    }
  };
  export default hourReducer;
  