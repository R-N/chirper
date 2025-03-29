import axios from "axios";
import Cookies from "js-cookie";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "https://chirper.test";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = "application/json";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
const createApi = () => {
  const api2 = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
    withXSRFToken: true,
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
    await api2.get("/sanctum/csrf-cookie");
    xsrfToken2 = Cookies.get("XSRF-TOKEN");
    if (xsrfToken2) ;
    else {
      console.log("Unable to obtain CSRF Cookie");
    }
  };
  api2.init = init;
  let xsrfToken = Cookies.get("XSRF-TOKEN");
  if (!xsrfToken) {
    api2.init();
  }
  api2.interceptors.request.use((config) => {
    let authToken = localStorage.getItem("auth_token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });
  return api2;
};
const api = createApi();
export {
  _export_sfc as _,
  api as a
};
