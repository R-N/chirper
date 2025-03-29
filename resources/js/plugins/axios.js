import axios from 'axios';
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
axios.defaults.headers['Content-Type'] = "application/json";
axios.defaults.headers['Accept'] = "application/json";
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

function readCookie(cookieName) {
  let value = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${cookieName}=`))
    ?.split('=')[1];
  if (value){
    value = decodeURIComponent(value);
  }
  return value;
}

const createApi = () => {
  const api = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  const init = async() =>{
    let xsrfToken = null;
    xsrfToken = Cookies.get("XSRF-TOKEN");
    if (xsrfToken){
      return;
    }
    console.log("CSRF Cookie not found. Obtaining.");
    await api.get('/sanctum/csrf-cookie');
    xsrfToken = Cookies.get("XSRF-TOKEN");
    if (xsrfToken){
      //axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;
      //console.log(`CSRF cookie set to ${xsrfToken}`);
    }else{
      console.log("Unable to obtain CSRF Cookie");
    }
  }
  api.init = init;
  let xsrfToken = Cookies.get("XSRF-TOKEN");
  if (!xsrfToken){
    api.init();
  }
  api.interceptors.request.use((config) => {
    let authToken = localStorage.getItem("auth_token");// ||| Cookies.get("chirper_session");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    // let xsrfToken1 = Cookies.get("XSRF-TOKEN");
    // if (xsrfToken1) {
    //   config.headers['X-XSRF-TOKEN'] = xsrfToken1;
    // }
    return config;
  });
  return api;
}

const api = createApi();

export {
  api,
  createApi,
}
export default api;
