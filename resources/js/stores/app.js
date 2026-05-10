import { defineStore } from "pinia";
import { isObject, deepAssign } from "@/libs/util.js";
import { router } from "@inertiajs/vue3";

export const useAppStore = defineStore("app", {
  state: () => ({
    globalLogout: false,
    globalRefresh: false,
    globalBusy: false,
    authBusy: false,

    userPresent: true,
    serverReachable: true,
    lastUserPresentTime: new Date().getTime(),
    settings: {}
  }),
  getters: {
    // getIdleTime: (state) => {
    //   return new Date().getTime() - state.lastUserPresentTime;
    // },
    idle: (state) => {
      return !state.userPresent;
    }
  },
  actions: {
    updateSettings(settings) {
      deepAssign(this.settings, settings);
    },
    getIdleTime() {
      return new Date().getTime() - this.lastUserPresentTime;
    },
    ping() {
      var now = new Date().getTime();
      this.lastUserPresentTime = now;
      this.userPresent = true;
    },
    setIdle() {
      this.userPresent = false;
    }
  },
  persist: {
    storage: localStorage
  }
});

export const pinger = async (...args) => {
  let appStore = useAppStore();
  if (appStore.getIdleTime() < 1000) return;
  await appStore.ping();
};
document.body.addEventListener("mousemove", pinger);
document.body.addEventListener("keypress", pinger);
document.body.addEventListener("mousedown", pinger);

export default useAppStore;
