import http from "../http-common";
import authHeader from './auth-header';

class ClientRequestDataService {
    getAll() {
      return http.get("/requests", { headers: authHeader() });
    }
    get(id) {
      return http.get(`/requests/${id}`, { headers: authHeader() });
    }
    create(data) {
      return http.post("/requests", data, { headers: authHeader() });
    }
    update(id, data) {
      return http.put(`/requests/${id}`, data, { headers: authHeader() });
    }
    delete(id) {
      return http.delete(`/requests/${id}`, { headers: authHeader() });
    }
}
export default new ClientRequestDataService();