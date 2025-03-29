<script lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
import { VApp, VAppBar, VToolbarTitle, VBtn, VIcon, VMenu, VList, VListItem, VAvatar, VImg, VNavigationDrawer, VContainer, VSpacer, VMain } from 'vuetify/components';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import { router } from '@inertiajs/vue3';
import authService from '@/services/user/auth.js';

@Component({
  components: {
    ApplicationLogo,
    Link,
    VApp,
    VAppBar,
    VToolbarTitle,
    VBtn,
    VIcon,
    VMenu,
    VList,
    VListItem,
    VAvatar,
    VImg,
    VNavigationDrawer,
    VContainer,
    VSpacer,
    VMain
  }
})
class AuthenticatedLayout extends Vue {
  showingNavigationDropdown;
  appName = import.meta.env.VITE_APP_NAME || 'Chirper';

  async logout() {
    let res = await authService.logout();
    router.visit(res.redirect || "/");
  }
}
export default toNative(AuthenticatedLayout);
</script>
<template>
    <VApp>
      <!-- App Bar -->
      <VAppBar color="primary" app>
        <VToolbarTitle>
            <Link :href="route('dashboard')" class="d-flex align-center gap-2 text-decoration-none">
                <ApplicationLogo class="h-9 w-auto" />
                {{ appName }}
            </Link>
        </VToolbarTitle>
  
        <VSpacer />
  
        <VBtn text :href="route('dashboard')">Dashboard</VBtn>
        <VBtn text :href="route('chirps.index')">Chirps</VBtn>
  
        <!-- Profile Menu -->
        <VMenu>
          <template #activator="{ props }">
            <VBtn v-bind="props" icon>
              <VAvatar size="32">
                <VImg 
                  :src="$page.props.auth.user.profile_photo_url" 
                  :alt="$page.props.auth.user.name" 
                  cover
                />
              </VAvatar>
            </VBtn>
          </template>
          <VList>
            <VListItem :href="route('profile.edit')">Profile</VListItem>
            <VListItem @click="logout">Log Out</VListItem>
          </VList>
        </VMenu>
  
        <!-- Mobile Navigation Toggle -->
        <VBtn icon @click="showingNavigationDrawer = !showingNavigationDrawer" class="d-sm-none">
          <VIcon>mdi-menu</VIcon>
        </VBtn>
      </VAppBar>
  
      <!-- Sidebar Navigation -->
      <VNavigationDrawer v-model="showingNavigationDrawer" app temporary>
        <VList>
          <VListItem :href="route('dashboard')">Dashboard</VListItem>
          <VListItem :href="route('chirps.index')">Chirps</VListItem>
          <VListItem :href="route('profile.edit')">Profile</VListItem>
          <VListItem @click="logout">Log Out</VListItem>
        </VList>
      </VNavigationDrawer>
  
      <!-- Page Content (Fixed Layout Overlap) -->
      <VMain>
        <slot />
      </VMain>
    </VApp>
  </template>
  