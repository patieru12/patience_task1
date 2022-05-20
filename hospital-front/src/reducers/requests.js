import {
    CREATE_REQUEST,
    RETRIEVE_REQUESTS,
    UPDATE_REQUEST,
    DELETE_REQUEST,
  } from "../actions/types";
  const initialState = [];
  function ClientReducer(requests = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_REQUEST:
        return [...requests, payload];
      case RETRIEVE_REQUESTS:
        return payload;
      case UPDATE_REQUEST:
        return requests.map((request) => {
          if (request.id === payload.id) {
            return {
              ...request,
              ...payload,
            };
          } else {
            return request;
          }
        });
      case DELETE_REQUEST:
        return requests.filter(({ id }) => id !== payload.id);
      default:
        return requests; 
    }
  };
  export default ClientReducer;
  