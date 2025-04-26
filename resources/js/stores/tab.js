import { defineStore } from 'pinia';
import { isObject } from '@/libs/util.js';
import { router } from '@inertiajs/vue3';

export const useTabStore = defineStore('tab', {
  state: () => ({ 
    tabBusy: false, 
    routerBusy: false, 

    routeValid: true,  
    tabDialogs: [], 
    breadcrumbs: [], 
  }),
  getters: {
  },
  actions: {
    async showError(error, title=null, onDismiss=null) { 
      if (isObject(error) && (error.text || error.title)){
        this.tabDialogs.push(error);
      }else{
        title = title || "Error";
        if (error.redirect && !onDismiss){
          const redirect = error.redirect;
          onDismiss = async () => await router.visit(redirect);
        }
        error = error.message || error;
        this.tabDialogs.push({
          title, text: error, onDismiss,
        });
      }
    },
  },
});

export default useTabStore;
