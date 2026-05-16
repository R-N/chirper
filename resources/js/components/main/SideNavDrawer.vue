<script setup lang="ts">
import { computed } from "vue";
import {
  VList,
  VListItem,
  VIcon,
  VRow,
  VCol,
  VNavigationDrawer,
  VListItemAction,
  VListItemTitle,
  VListSubheader,
  VListGroup
} from "vuetify/components";
import { router } from "@/plugins/inertia";
import { useAuth } from "@/composables/useAuth";
import { t } from "@/plugins/i18n";

const { hasPermission } = useAuth();

const props = defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:drawer": [value: boolean];
  change: [value: boolean];
}>();

const syncedDrawer = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const systemChildren = computed(() => {
  const children = [];
  if (hasPermission("user.view")) children.push({ text: t("navigation.users"), href: route("system.users.index") });
  if (hasPermission("role.view")) children.push({ text: t("navigation.roles"), href: route("system.roles.index") });
  if (hasPermission("user.view")) children.push({ text: t("navigation.backup"), href: route("system.backups.index") });
  if (hasPermission("user.view")) children.push({ text: t("navigation.settings"), href: route("system.settings.index") });
  if (hasPermission("user.view")) children.push({ text: t("navigation.activity_log"), href: route("system.activity.index") });
  return children;
});

const items = computed(() => {
  const nav = [
    { icon: "mdi-home", text: "Dashboard", href: route("dashboard") },
    {
      icon: "mdi-chat",
      text: t("navigation.chirper"),
      model: false,
      children: [
        { text: t("navigation.chirps"), href: route("chirps.index") },
        {
          text: t("navigation.chirps_crud"),
          href: route("chirps.index2")
        }
      ]
    },
  ];
  if (systemChildren.value.length > 0) {
    nav.push({
      icon: "mdi-wrench",
      text: t("navigation.system"),
      model: false,
      children: systemChildren.value,
    });
  }
  return nav;
});
</script>
<template>
  <VNavigationDrawer v-model="syncedDrawer" app>
    <VList dense nav>
      <template v-for="item in items">
        <VRow v-if="item.heading" :key="item.heading" align="center">
          <VCol cols="6">
            <VListSubheader v-if="item.heading">
              {{ item.heading }}
            </VListSubheader>
          </VCol>
          <VCol cols="6" class="text-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </VCol>
        </VRow>
        <VListGroup
          v-else-if="item.children"
          :key="item.text + 'g'"
          v-model="item.model"
          :prepend-icon="item.icon"
        >
          <template #activator="{ props }">
            <VListItem v-bind="props">
              <!-- <template v-slot:prepend v-if="item.icon">
                                <VIcon>{{ item.model ? item.icon : item['icon-alt'] }}</VIcon>
                            </template> -->
              <VListItemTitle>{{ item.text }}</VListItemTitle>
            </VListItem>
          </template>
          <VListItem
            v-for="(child, i) in item.children"
            :key="i"
            link
            @click="router.visit(child.href)"
          >
            <template v-slot:prepend v-if="child.icon">
              <VIcon>{{ child.icon }}</VIcon>
            </template>
            <VListItemTitle>{{ child.text }}</VListItemTitle>
          </VListItem>
        </VListGroup>
        <VListItem v-else :key="item.text" link @click="router.visit(item.href)">
          <template v-slot:prepend v-if="item.icon">
            <VIcon>{{ item.icon }}</VIcon>
          </template>
          <VListItemTitle>{{ item.text }}</VListItemTitle>
        </VListItem>
      </template>
    </VList>
  </VNavigationDrawer>
</template>
<style scoped></style>
