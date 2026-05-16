import { t } from "@/plugins/i18n";

const routes = [
  // Guest routes — full page, no persistent shell
  {
    path: "/",
    name: "welcome",
    component: () => import("@/modules/guest/pages/Welcome.vue"),
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/modules/user/auth/views/Login.vue"),
    meta: { guest: true, breadcrumbs: [{ title: () => t("auth.login") }] },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/modules/user/auth/pages/Register.vue"),
    meta: { guest: true, breadcrumbs: [{ title: () => t("auth.register") }] },
  },
  {
    path: "/forgot-password",
    name: "password.request",
    component: () => import("@/modules/user/auth/pages/ForgotPassword.vue"),
    meta: {
      guest: true,
      breadcrumbs: [{ title: () => t("password_reset.title") }],
    },
  },
  {
    path: "/reset-password/:token",
    name: "password.reset",
    component: () => import("@/modules/user/auth/pages/ResetPassword.vue"),
    meta: { guest: true },
  },
  {
    path: "/verification/verify-email",
    name: "verification.notice",
    component: () => import("@/modules/user/auth/pages/VerifyEmail.vue"),
    meta: { guest: true },
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () => import("@/modules/guest/pages/PrivacyPolicy.vue"),
    meta: { guest: true },
  },
  {
    path: "/terms-of-service",
    name: "terms-of-service",
    component: () => import("@/modules/guest/pages/TermsOfService.vue"),
    meta: { guest: true },
  },

  // Authenticated routes — rendered inside persistent shell
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/modules/general/views/Welcome.vue"),
    meta: {
      breadcrumbs: [{ title: () => t("navigation.dashboard") }],
    },
  },
  {
    path: "/confirm-password",
    name: "password.confirm",
    component: () => import("@/modules/user/auth/pages/ConfirmPassword.vue"),
    meta: { breadcrumbs: [{ title: () => t("auth.confirm_password") }] },
  },

  // Chirps
  {
    path: "/chirps",
    name: "chirps.index",
    component: () => import("@/modules/chirps/views/Chirps.vue"),
    meta: { breadcrumbs: [{ title: () => t("navigation.chirps") }] },
  },
  {
    path: "/chirps2",
    name: "chirps.index2",
    component: () => import("@/modules/chirps/views/ChirpsList.vue"),
    meta: { breadcrumbs: [{ title: () => t("navigation.chirps_crud") }] },
  },

  // Profile
  {
    path: "/profile",
    name: "profile.show",
    component: () => import("@/modules/user/profile/views/ProfileView.vue"),
    meta: { breadcrumbs: [{ title: () => t("profile.title") }] },
  },
  {
    path: "/user/profile",
    name: "profile.edit",
    component: () => import("@/modules/user/profile/views/ProfileShowView.vue"),
    meta: { breadcrumbs: [{ title: () => t("profile.title") }] },
  },
  {
    path: "/user/api-tokens",
    name: "api-tokens.index",
    component: () => import("@/modules/user/api/views/ApiTokensView.vue"),
    meta: { breadcrumbs: [{ title: () => t("api_token.title") }] },
  },

  // System
  {
    path: "/system/users",
    name: "system.users.index",
    component: () => import("@/modules/system/users/views/Users.vue"),
    meta: {
      permission: "user.view",
      breadcrumbs: [
        { title: () => t("navigation.system") },
        { title: () => t("navigation.users") },
      ],
    },
  },
  {
    path: "/system/users/:id",
    name: "system.users.show",
    component: () => import("@/modules/system/users/views/User.vue"),
    meta: {
      permission: "user.view",
      breadcrumbs: [
        { title: () => t("navigation.system") },
        { title: () => t("navigation.users") },
      ],
    },
  },
  {
    path: "/system/roles",
    name: "system.roles.index",
    component: () => import("@/modules/system/roles/views/Roles.vue"),
    meta: {
      permission: "role.view",
      breadcrumbs: [
        { title: () => t("navigation.system") },
        { title: () => t("navigation.roles") },
      ],
    },
  },
  {
    path: "/system/backups",
    name: "system.backups.index",
    component: () => import("@/modules/system/backups/views/Backups.vue"),
    meta: {
      permission: "user.view",
      breadcrumbs: [
        { title: () => t("navigation.system") },
        { title: () => t("navigation.backup") },
      ],
    },
  },
  {
    path: "/system/settings",
    name: "system.settings.index",
    component: () => import("@/modules/system/settings/views/Settings.vue"),
    meta: {
      permission: "user.view",
      breadcrumbs: [
        { title: () => t("navigation.system") },
        { title: () => t("navigation.settings") },
      ],
    },
  },
  {
    path: "/system/activity",
    name: "system.activity.index",
    component: () => import("@/modules/system/activity/views/Activity.vue"),
    meta: {
      permission: "user.view",
      breadcrumbs: [
        { title: () => t("navigation.system") },
        { title: () => t("navigation.activity_log") },
      ],
    },
  },
  {
    path: "/system/activity/:id",
    name: "system.activity.show",
    component: () => import("@/modules/system/activity/views/ActivityShow.vue"),
    meta: {
      permission: "user.view",
      breadcrumbs: [
        { title: () => t("navigation.system") },
        { title: () => t("navigation.activity_log") },
      ],
    },
  },

  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/modules/general/views/NotFound.vue"),
  },
];

export default routes;
