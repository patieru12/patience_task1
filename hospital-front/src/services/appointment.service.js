import http from "../http-common";
import authHeader from './auth-header';

class AppointmentDataService {
    getAll() {
      return http.get("/appointments", { headers: authHeader() });
    }
    get(id) {
      return http.get(`/appointments/${id}`, { headers: authHeader() });
    }
    approve(id) {
      return http.get(`/appointments/${id}/approve`, { headers: authHeader() });
    }
    reject(id) {
      return http.get(`/appointments/${id}/reject`, { headers: authHeader() });
    }
    create(data) {
      return http.post("/appointments", data, { headers: authHeader() });
    }
    update(id, data) {
      return http.put(`/appointments/${id}`, data, { headers: authHeader() });
    }
    delete(id) {
      return http.delete(`/appointments/${id}`, { headers: authHeader() });
    }
  }
  export default new AppointmentDataService();