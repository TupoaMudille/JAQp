import axios from "axios";
const apiHost = axios.create({
  baseURL: "http://localhost:8080/",
});

apiHost.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response.status === 401 || error.response.status === 403) {
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);
export { apiHost };
