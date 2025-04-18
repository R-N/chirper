import axios from 'axios';
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/auth';

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


const initXsrf = async(api) =>{
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

const injectAuth = (config) => {
  if (config.headers.Authorization)
    return config;
  const authStore = useAuthStore();
  let authToken = authStore.auth_token || localStorage.getItem("auth_token");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
};

const createApi = async () => {
  const api = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  api.init = () => initXsrf(api);
  let xsrfToken = Cookies.get("XSRF-TOKEN");
  if (!xsrfToken){
    await api.init();
  }
  api.interceptors.request.use(injectAuth);
  return api;
}

axios.interceptors.request.use(injectAuth);
const api = await createApi();

export {
  api,
  createApi,
}
export default api;
