import http from "../http-common";
import authHeader from './auth-header';

class HourDataService {
    getAll() {
      return http.get("/hours", { headers: authHeader() });
    }
    get(id) {
      return http.get(`/hours/${id}`, { headers: authHeader() });
    }
    create(data) {
      return http.post("/hours", data, { headers: authHeader() });
    }
    update(id, data) {
      return http.put(`/hours/${id}`, data, { headers: authHeader() });
    }
    delete(id) {
      return http.delete(`/hours/${id}`, { headers: authHeader() });
    }
    findByDay(day) {
      return http.get(`/hours?day=${day}`, { headers: authHeader() });
    }
  }
  export default new HourDataService();