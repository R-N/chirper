import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({ 
    globalLogout: false, 
    globalRefresh: false, 
    globalBusy: false, 
    authBusy: false, 
    tabBusy: false, 
    routerBusy: false, 

    userPresent: true,  
    serverReachable: true,  
    routeValid: true,  
    lastUserPresentTime: new Date().getTime(),
    tabDialogs: [], 
    breadcrumbs: [], 
  }),
  getters: {
    getIdleTime: (state) => {
      return new Date().getTime() - state.lastUserPresentTime;
    },
    idle: (state) => {
      return !state.userPresent;
    }
  },
  actions: {
    // getIdleTime(){
    //   return new Date().getTime() - this.lastUserPresentTime;
    // },
    showError(message) { 
      this.tabDialogs.push({
        title: "Error",
        text: message
      });
    },
    ping(){
      var now = new Date().getTime();
      this.lastUserPresentTime = now;
      this.userPresent = true;
    },
    setIdle(){
      this.userPresent = false;
    },
  },
  persist: {
    storage: localStorage, 
  }
});

export const pinger = async (...args) => {
  let appStore = useAppStore();
  if (appStore.getIdleTime < 1000) return;
  await appStore.ping();
}
document.body.addEventListener('mousemove', pinger);
document.body.addEventListener('keypress', pinger);
document.body.addEventListener('mousedown', pinger);

export default useAppStore;
