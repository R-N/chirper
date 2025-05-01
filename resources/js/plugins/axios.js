import axios from 'axios';
import Cookies from 'js-cookie';
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


const initXsrf = async(api, force=false) =>{
  let xsrfToken = null;
  if (force){
    Cookies.remove("XSRF-TOKEN");
    Cookies.remove('XSRF-TOKEN', { path: '/' });
  }
  xsrfToken = Cookies.get("XSRF-TOKEN");
  if (!force && xsrfToken){
    return;
  }
  console.log("CSRF Cookie not found. Obtaining.");
  // No API route
  await api.get('/sanctum/csrf-cookie');
  xsrfToken = Cookies.get("XSRF-TOKEN");
  if (xsrfToken){
    window.location.reload();
    return xsrfToken;
  }else{
    console.log("Unable to obtain CSRF Cookie");
  }
}

const injectAuth = (config) => {
  if (config.headers.Authorization)
    return config;
  try{
    const authStore = useAuthStore();
    let authToken = authStore.auth_token || localStorage.getItem("auth_token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
  }catch(ex){
    console.error("Failed to inject auth token");
  }
  return config;
};

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
  api.init = (force=false) => initXsrf(api, force);
  let xsrfToken = Cookies.get("XSRF-TOKEN");
  if (!xsrfToken){
    api.init();
  }
  api.interceptors.request.use(injectAuth);
  return api;
}

axios.interceptors.request.use(injectAuth);
const api = createApi();

export {
  api,
  createApi,
}
export default api;
