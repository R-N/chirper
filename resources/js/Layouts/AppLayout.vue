<script lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { VAppBar, VToolbarTitle, VBtn, VMenu, VList, VListItem, VAvatar, VIcon, VContainer, VRow, VCol, VNavigationDrawer, VImg, VMain  } from 'vuetify/components';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import authService from '@/services/user/auth.js';

@Component({
  components: {
    ApplicationLogo,
    Head,
    Link,
    VAppBar,
    VToolbarTitle,
    VBtn,
    VMenu,
    VList,
    VListItem,
    VAvatar,
    VIcon,
    VContainer,
    VRow,
    VCol,
    VNavigationDrawer,
    VImg,
    VMain
  }
})
class AppLayout extends Vue {
  showingNavigationDropdown = false;
  @Prop(String) title;
  appName = import.meta.env.VITE_APP_NAME || 'Chirper';

  async logout() {
    let res = await authService.logout();
    router.visit(res.redirect || "/");
  }
  async switchToTeam(team){
    let res = await authService.switchToTeam(team);
  };
}
export default toNative(AppLayout);

</script>
<template>
  <VApp>
    <Head :title="title" />
    
    <!-- App Bar -->
    <VAppBar color="primary" app>
      <!-- Sidebar Toggle Button -->
      <VBtn icon @click="showingNavigationDropdown = !showingNavigationDropdown">
        <VIcon>mdi-menu</VIcon>
      </VBtn>

      <VToolbarTitle>
        <Link :href="route('dashboard')" class="d-flex align-center gap-2 text-decoration-none">
          <ApplicationLogo class="h-9 w-auto" />
          {{ appName }}
        </Link>
      </VToolbarTitle>

      <VSpacer />

      <!-- Team Switcher (if enabled) -->
      <VMenu v-if="$page.props.jetstream.hasTeamFeatures">
        <template #activator="{ props }">
          <VBtn v-bind="props">
            {{ $page.props.auth.user.current_team.name }}
            <VIcon end>mdi-chevron-down</VIcon>
          </VBtn>
        </template>
        <VList>
          <VListItem 
            v-for="team in $page.props.auth.user.all_teams" 
            :key="team.id" 
            @click="switchToTeam(team)"
          >
            <VIcon v-if="team.id == $page.props.auth.user.current_team_id" color="success">mdi-check</VIcon>
            {{ team.name }}
          </VListItem>
        </VList>
      </VMenu>

      <!-- User Profile Menu -->
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
          <VListItem :href="route('profile.show')">Profile</VListItem>
          <VListItem v-if="$page.props.jetstream.hasApiFeatures" :href="route('api-tokens.index')">API Tokens</VListItem>
          <VListItem @click="logout">Log Out</VListItem>
        </VList>
      </VMenu>
    </VAppBar>

    <!-- Sidebar Navigation -->
    <VNavigationDrawer app v-model="showingNavigationDropdown">
      <VList>
        <VListItem :href="route('dashboard')">Dashboard</VListItem>
        <VListItem :href="route('chirps.index')">Chirps</VListItem>
      </VList>
    </VNavigationDrawer>

    <!-- Page Content (Fixes Overlap Issue) -->
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>
