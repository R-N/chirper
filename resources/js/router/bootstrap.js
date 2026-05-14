import api from "@/plugins/axios";
import { useAuthStore } from "@/stores/auth";
import { useAppStore } from "@/stores/app";
import { getPageProps } from "@/plugins/inertia";

export async function bootstrap() {
  const authStore = useAuthStore();
  const appStore = useAppStore();
  const pageProps = getPageProps();

  if (!authStore.auth_token) return;

  try {
    const res = await api.get("/api/bootstrap");
    const data = res.data;

    if (data.user) {
      authStore.updateUser(data.user);
      pageProps.user = data.user;
      pageProps.auth.user = data.user;
    }
    if (data.settings) {
      appStore.updateSettings(data.settings);
      pageProps.settings = data.settings;
    }
    if (data.notifications !== undefined) {
      pageProps.notifications = data.notifications;
    }
    if (data.ziggy) {
      globalThis.Ziggy = data.ziggy;
    }

    // Session valid but token lost — clear stale user to keep state consistent
    if (!authStore.auth_token && pageProps.user) {
      authStore.logout();
      pageProps.user = null;
      pageProps.auth.user = null;
    }
  } catch (e) {
    console.error("SPA bootstrap failed:", e);
  }
}
