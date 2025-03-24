import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "https://chirper.test";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = "application/json";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
const api = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});
const init = async () => {
  let xsrfToken2 = null;
  xsrfToken2 = Cookies.get("XSRF-TOKEN");
  if (xsrfToken2) {
    return;
  }
  console.log("CSRF Cookie not found. Obtaining.");
  await api.get("/sanctum/csrf-cookie");
  xsrfToken2 = Cookies.get("XSRF-TOKEN");
  if (xsrfToken2) ;
  else {
    console.log("Unable to obtain CSRF Cookie");
  }
};
let xsrfToken = Cookies.get("XSRF-TOKEN");
if (!xsrfToken) {
  init();
}
api.interceptors.request.use((config) => {
  let authToken = localStorage.getItem("auth_token");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
api.init = init;
export {
  api as a
};
