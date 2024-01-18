import axios from 'axios'
const apiHost = axios.create({
    baseURL: "http://localhost:8080/"
});
export { apiHost }
