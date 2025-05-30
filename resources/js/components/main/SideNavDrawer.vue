<script lang="ts">
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
import { Component, Prop, Model, toNative } from "vue-facing-decorator";
import { MyComponent } from "@/components/MyComponent.vue";

@Component({
  name: "SideNavDrawer",
  components: {
    VList,
    VListItem,
    VIcon,
    VRow,
    VCol,
    VNavigationDrawer,
    VListSubheader,
    VListGroup,
    VListItemAction,
    VListItemTitle
  },
  emits: ["update:modelValue", "update:drawer", "change"]
})
class SideNavDrawer extends MyComponent {
  @Model({ type: Boolean }) syncedDrawer;
  get items() {
    return [
      { icon: "mdi-home", text: "Dashboard", href: route("dashboard") },
      {
        icon: "mdi-chat",
        // 'icon-alt': 'mdi-chevron-down',
        text: this.$t("navigation.chirper"),
        model: false,
        children: [
          { text: this.$t("navigation.chirps"), href: route("chirps.index") },
          {
            text: this.$t("navigation.chirps_crud"),
            href: route("chirps.index2")
          }
        ]
      },
      {
        icon: "mdi-wrench",
        text: this.$t("navigation.system"),
        model: false,
        children: [
          {
            text: this.$t("navigation.users"),
            href: route("system.users.index")
          },
          {
            text: this.$t("navigation.backup"),
            href: route("system.backups.index")
          },
          {
            text: this.$t("navigation.settings"),
            href: route("system.settings.index")
          }
        ]
      }
    ];
  }
}
export { SideNavDrawer };
export default toNative(SideNavDrawer);
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
            :href="child.href"
            :to="child.to"
            link
          >
            <template v-slot:prepend v-if="child.icon">
              <VIcon>{{ child.icon }}</VIcon>
            </template>
            <VListItemTitle>{{ child.text }}</VListItemTitle>
          </VListItem>
        </VListGroup>
        <VListItem v-else :key="item.text" :href="item.href" :to="item.to" link>
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
