import { ref, reactive, computed, defineComponent, h } from "vue";
import { router as inertiaRouter, useForm as inertiaUseForm, usePage as inertiaUsePage, Link as InertiaLink, Head as InertiaHead } from "@inertiajs/vue3";
import { createRouter, createWebHistory, RouterLink } from "vue-router";
import routes from "@/router/index.js";
import { setupGuards } from "@/router/guards.js";

const MODE = import.meta.env.VITE_APP_MODE || "inertia";
export const MODE_NAME = MODE;
export const IS_SPA_MODE = MODE === "spa";

// Derive base path from APP_URL or current location
function getBasePath() {
  const appUrl = import.meta.env.VITE_API_BASE_URL || "";
  try {
    const url = new URL(appUrl);
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return "/";
  }
}

const basePath = getBasePath();

// Strip base path prefix from a URL for Vue Router
function stripBase(url) {
  if (typeof url !== "string") return url;
  let path = url;
  // Extract pathname from absolute URLs
  if (url.startsWith("http://") || url.startsWith("https://")) {
    try { path = new URL(url).pathname; } catch { /* keep as-is */ }
  }
  if (basePath !== "/" && path.startsWith(basePath)) {
    return path.slice(basePath.length) || "/";
  }
  return path;
}

// ─── Vue Router instance (SPA mode) ───
export const vueRouter = IS_SPA_MODE
  ? createRouter({ history: createWebHistory(basePath === "/" ? "/" : basePath), routes })
  : null;

if (IS_SPA_MODE && vueRouter) {
  setupGuards(vueRouter);
}

// ─── Shared page props (SPA mode) ───
const spaPageProps = IS_SPA_MODE
  ? reactive({
      settings: {},
      user: null,
      notifications: [],
      ziggy: null,
      auth: { user: null },
      jetstream: {
        canCreateTeams: false,
        canManageTwoFactorAuthentication: false,
        canUpdateProfileInformation: true,
        canUpdatePasswords: true,
        hasAccountDeletionFeatures: true,
        hasApiFeatures: true,
        hasTeamFeatures: false,
        hasTermsAndPrivacyPolicyFeature: false,
        managesProfilePhotos: false,
        flash: { token: "" },
      },
    })
  : null;

// ─── router ───
export const router = IS_SPA_MODE
  ? {
      visit(url) { vueRouter.push(stripBase(url)); },
      get(url) { vueRouter.push(stripBase(url)); },
      post() {},
      put() {},
      patch() {},
      delete() {},
      on() { return () => {}; },
    }
  : inertiaRouter;

// ─── usePage ───
export const usePage = IS_SPA_MODE
  ? () => ({ props: spaPageProps })
  : inertiaUsePage;

// ─── Link ───
export const Link = IS_SPA_MODE
  ? defineComponent({
      props: { href: [String, Object], to: [String, Object] },
      setup(props, { slots }) {
        const resolved = computed(() => {
          const raw = props.href ?? props.to ?? "/";
          return typeof raw === "string" ? stripBase(raw) : raw;
        });
        return () => h(RouterLink, { to: resolved.value }, slots);
      },
    })
  : InertiaLink;

// ─── Head ───
export const Head = IS_SPA_MODE
  ? defineComponent({
      props: { title: String },
      setup(props) {
        if (props.title) document.title = props.title;
        return () => null;
      },
    })
  : InertiaHead;

// ─── useForm ───
export const useForm = IS_SPA_MODE ? createSpaForm : inertiaUseForm;

function createSpaForm(initialData) {
  const data = reactive({ ...initialData });
  const errors = reactive({});
  const processing = ref(false);
  const isSubmitting = ref(false);
  const wasSuccessful = ref(false);
  const recentlySuccessful = ref(false);

  function reset(...fields) {
    if (fields.length === 0) {
      Object.keys(initialData).forEach((k) => { data[k] = initialData[k]; });
    } else {
      fields.forEach((f) => { if (f in initialData) data[f] = initialData[f]; });
    }
    clearErrors();
  }

  function clearErrors(...fields) {
    if (fields.length === 0) {
      Object.keys(errors).forEach((k) => delete errors[k]);
    } else {
      fields.forEach((f) => delete errors[f]);
    }
  }

  function setError(field, message) {
    if (typeof field === "object") {
      Object.entries(field).forEach(([k, v]) => (errors[k] = v));
    } else {
      errors[field] = message;
    }
  }

  function setErrors(newErrors) {
    Object.keys(errors).forEach((k) => delete errors[k]);
    Object.assign(errors, newErrors);
  }

  function transform() { return formApi; }

  const formApi = reactive({
    errors,
    processing,
    isSubmitting,
    wasSuccessful,
    recentlySuccessful,
    reset,
    clearErrors,
    setError,
    setErrors,
    transform,
    data: () => JSON.parse(JSON.stringify(data)),
    __isSpaForm: true,
    __data: data,
    submit() {},
  });

  Object.keys(initialData).forEach((key) => {
    Object.defineProperty(formApi, key, {
      get() { return data[key]; },
      set(val) { data[key] = val; },
      enumerable: true,
      configurable: true,
    });
  });

  return formApi;
}

// ─── $page global property for SPA mode ───
// Inertia injects $page as a global property. SPA mode must too.
export const spaPageComputed = IS_SPA_MODE
  ? computed(() => ({ props: spaPageProps }))
  : null;

// ─── Helpers ───

export function visit(url) {
  if (IS_SPA_MODE) {
    vueRouter.push(stripBase(url));
  } else {
    inertiaRouter.visit(url);
  }
}

export function getPageProps() {
  return spaPageProps;
}
