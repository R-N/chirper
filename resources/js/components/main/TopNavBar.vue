<script lang="ts">
import ApplicationLogo from '@/components/general/ApplicationLogo.vue';
import { Link, router } from '@inertiajs/vue3';
import { VAppBar, VToolbarTitle, VBtn, VMenu, VList, VListItem, VAvatar, VIcon, VImg  } from 'vuetify/components';
import { Component, Prop, Model, toNative } from 'vue-facing-decorator';
import {MyComponent} from "@/components/MyComponent.vue";
import authService from '@/modules/user/auth/services/auth.js';

@Component({
    name: "TopNavBar",
    components: {
        ApplicationLogo,
        Link,
        VAppBar,
        VToolbarTitle,
        VBtn,
        VMenu,
        VList,
        VListItem,
        VAvatar,
        VIcon,
        VImg,
    }
})
class TopNavBar extends MyComponent {
    @Prop({ type: String }) appName;
    @Model({ name: 'drawer', type: Boolean }) syncedDrawer;
    notifs = [
        { text: 'Notif 1' },
        { text: 'Notif 2' }
    ]
    get notifCount(){
        return this.notifs.length;
    }
    async logout() {
        let res = await authService.logout();
        router.visit(res.redirect || "/");
    }
    async switchToTeam(team){
        let res = await authService.switchToTeam(team);
    };
}
export { TopNavBar }
export default toNative(TopNavBar);
</script>
<template>
    <VAppBar
        app
        color="primary"
        dark
    >
        <VAppBarNavIcon @click.stop="syncedDrawer = !syncedDrawer"></VAppBarNavIcon>
        <VToolbarTitle
            style="width: 300px"
            class="ml-0 pl-4"
        >
            <Link :href="route('dashboard')" class="d-flex align-center gap-2 text-decoration-none hidden-sm-and-down">
                <ApplicationLogo class="h-9 w-auto" />
                {{ appName }}
            </Link>
        </VToolbarTitle>
        <VSpacer></VSpacer>
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
        <VMenu
            bottom
            left
            close-on-click
            offset-y
        >
            <template #activator="{ props }">
                <VBtn 
                    icon
                    v-bind="props"
                >
                    <v-badge
                        overlap
                        color="green"
                        :content="notifCount"
                        :value="notifCount"
                    >
                        <VIcon>mdi-bell</VIcon>
                    </v-badge>
                </VBtn>
            </template>

            <VList>
                <VListItem
                    v-for="(notif, i) in notifs"
                    :key="i"
                    @click=""
                >
                    <VListItemTitle>{{ notif.text }}</VListItemTitle>
                </VListItem>
            </VList>
        </VMenu>
        <!-- User Profile Menu -->
        <VMenu
            bottom
            left
            close-on-click
            offset-y
        >
            <template #activator="{ props }">
                <VBtn 
                    icon
                    text
                    large
                    v-bind="props"
                >
                    <VAvatar size="32" item>
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
</template>
<style scoped>
</style>