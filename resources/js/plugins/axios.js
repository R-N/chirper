import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/auth";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = "application/json";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";

function readCookie(cookieName) {
  let value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1];
  if (value) {
    value = decodeURIComponent(value);
  }
  return value;
}

const initXsrf = async (api, force = false) => {
  let xsrfToken = null;
  if (force) {
    Cookies.remove("XSRF-TOKEN");
    Cookies.remove("XSRF-TOKEN", { path: "/" });
  }
  xsrfToken = Cookies.get("XSRF-TOKEN");
  if (!force && xsrfToken) {
    return;
  }
  console.log("CSRF Cookie not found. Obtaining.");
  // No API route
  await api.get("/sanctum/csrf-cookie");
  xsrfToken = Cookies.get("XSRF-TOKEN");
  if (xsrfToken) {
    window.location.reload();
    return xsrfToken;
  } else {
    console.log("Unable to obtain CSRF Cookie");
  }
};

const injectAuth = (config) => {
  if (config.headers.Authorization) return config;
  try {
    const authStore = useAuthStore();
    let authToken = authStore.auth_token || localStorage.getItem("auth_token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
  } catch (ex) {
    console.error("Failed to inject auth token");
  }
  return config;
};

function clearAuthAndRedirect() {
  try {
    const authStore = useAuthStore();
    authStore.logout();
  } catch {
    localStorage.removeItem("auth_token");
  }
  window.location.href = "/login";
}

let isRefreshingCsrf = false;
let pendingRequests = [];

const handleSessionExpiry = (error) => {
  const status = error?.response?.status;

  // 401: session fully expired, no recovery possible
  // 403: forbidden (e.g. auth_session middleware rejects expired session)
  if (status === 401 || status === 403) {
    clearAuthAndRedirect();
    return Promise.reject(error);
  }

  // 419: CSRF token mismatch — try to refresh once
  if (status === 419) {
    if (isRefreshingCsrf) {
      // Queue this request to retry after CSRF refresh completes
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject, error });
      });
    }

    isRefreshingCsrf = true;

    return axios
      .get("/sanctum/csrf-cookie", { __bypassInterceptor: true })
      .then(() => {
        // Retry all queued requests
        pendingRequests.forEach(({ resolve, reject, error: err }) => {
          axios.request(err.config).then(resolve).catch(reject);
        });
        pendingRequests = [];
        // Retry the original request
        return axios.request(error.config);
      })
      .catch(() => {
        // CSRF refresh failed — session is dead
        pendingRequests.forEach(({ reject, error: err }) => reject(err));
        pendingRequests = [];
        clearAuthAndRedirect();
        return Promise.reject(error);
      })
      .finally(() => {
        isRefreshingCsrf = false;
      });
  }

  return Promise.reject(error);
};

const createApi = () => {
  const api = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
  api.init = (force = false) => initXsrf(api, force);
  let xsrfToken = Cookies.get("XSRF-TOKEN");
  if (!xsrfToken) {
    api.init();
  }
  api.interceptors.request.use(injectAuth);
  api.interceptors.response.use(
    (response) => response,
    handleSessionExpiry
  );
  return api;
};

axios.interceptors.request.use(injectAuth);
axios.interceptors.response.use(
  (response) => response,
  handleSessionExpiry
);
const api = createApi();

export { api, createApi };
export default api;
