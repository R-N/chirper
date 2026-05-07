<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Link, router } from "@inertiajs/vue3";
import {
  VAppBar,
  VToolbarTitle,
  VBtn,
  VMenu,
  VList,
  VListItem,
  VAvatar,
  VIcon,
  VImg,
  VSpacer,
  VBtnGroup
} from "vuetify/components";
import { useWorking } from "@/composables/useWorking";
import authService from "@/modules/user/auth/services/auth.js";
import profileService from "@/modules/user/profile/services/profile";
import IconButton from "@/components/button/IconButton.vue";
import Notifications from "./Notifications.vue";
import ApplicationLogo from "@/components/general/ApplicationLogo.vue";
import { VAppBarNavIcon, VCard, VCardItem, VCardTitle, VCardSubtitle, VCardActions, VSelect } from "vuetify/components";
import { getI18n, locales } from "@/plugins/i18n";

const props = defineProps({
  appName: { type: String },
  modelValue: { type: Boolean },
  drawer: { type: Boolean },
  parentBusy: { default: false },
});

const emit = defineEmits(["update:modelValue", "update:drawer", "change"]);

const { userName, userRolesText } = useWorking(props);

const syncedDrawer = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const locale = ref(getI18n()?.global.locale ?? "en");
const localesList = computed(() => locales ?? []);

async function logout() {
  let res = await authService.logout();
  router.visit(res.redirect || "/");
}

async function switchToTeam(team) {
  let res = await authService.switchToTeam(team);
}

async function setLocale(loc) {
  profileService.setLocale({ locale: loc });
}

watch(locale, (newLocale) => {
  setLocale(newLocale);
});
</script>
<template>
  <VAppBar app color="primary" dark>
    <VAppBarNavIcon @click.stop="syncedDrawer = !syncedDrawer"></VAppBarNavIcon>
    <VToolbarTitle style="width: 300px" class="ml-0 pl-4">
      <Link
        :href="route('dashboard')"
        class="d-flex align-center gap-2 text-decoration-none hidden-sm-and-down"
      >
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
          <VIcon
            v-if="team.id == $page.props.auth.user.current_team_id"
            color="success"
            >mdi-check</VIcon
          >
          {{ team.name }}
        </VListItem>
      </VList>
    </VMenu>
    <Notifications />
    <!-- User Profile Menu -->
    <VMenu bottom left close-on-click offset-y>
      <template #activator="{ props }">
        <VBtn icon text large v-bind="props">
          <VAvatar size="32" item>
            <VImg
              :src="$page.props.auth.user.profile_photo_url"
              :alt="$page.props.auth.user.name"
              cover
            />
          </VAvatar>
        </VBtn>
      </template>

      <VCard class="d-flex">
        <VCardItem
          class="d-flex"
          :prepend-avatar="$page.props.auth.user.profile_photo_url"
          @click.stop
        >
          <VCardTitle class="d-flex pl-2">
            {{ userName }}
          </VCardTitle>
          <VCardSubtitle class="d-flex pl-2">
            {{ userRolesText }}
          </VCardSubtitle>
        </VCardItem>
        <VCardActions class="d-flex flex-grow-1">
          <VList class="d-flex flex-grow-1 flex-column">
            <VListItem @click.stop>
              <VSelect
                class="mt-2"
                v-model="locale"
                :items="localesList"
                :label="$t('profile.lang')"
                hide-details
                density="compact"
                variant="outlined"
                @update:model-value="setLocale"
              />
            </VListItem>
            <VListItem :href="route('profile.show')">{{
              $t("navigation.profile")
            }}</VListItem>
            <VListItem
              v-if="$page.props.jetstream.hasApiFeatures"
              :href="route('api-tokens.index')"
              >{{ $t("navigation.api_tokens") }}</VListItem
            >
            <VListItem @click="logout">{{ $t("auth.logout") }}</VListItem>
          </VList>
        </VCardActions>
      </VCard>
    </VMenu>
  </VAppBar>
</template>
<style scoped></style>
