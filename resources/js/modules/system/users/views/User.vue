<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import MainCard from "@/components/card/MainCard.vue";
import userService from "../services/user";
import UserForm from "../forms/User.vue";
import rules from "@/validations-gen/users.json";
import { parseLaravelRules } from "@/libs/validation";
import { t } from "@/plugins/i18n";

import { useViewBase } from "@/composables/useViewBase";

const props = defineProps<{
  parentBusy?: any;
  item_id: number;
  __item?: any;
}>();

const emit = defineEmits<{
  (e: "update:item", value: any): void;
}>();

const {
  busy,
  waitBusy,
  showError,
} = useViewBase(props);

const _item = ref<any>(null);

const item = computed({
  get() {
    if (props.__item) return props.__item;
    return _item.value;
  },
  set(value: any) {
    if (props.__item) emit("update:item", value);
    else _item.value = value;
  },
});

const parsedRules = computed(() => parseLaravelRules(rules));

const availableRoles = ref<any[]>([]);
const availablePermissions = ref<any[]>([]);

const title = computed(() => {
  if (item.value) return `${t("user.item")}: ${item.value.name}`;
  return t("user.item");
});

async function get() {
  await waitBusy(async () => {
    const ret = await userService.get({ id: props.item_id });
    const data = userService.getData(ret);
    item.value = data;
    return data;
  });
}

onMounted(async () => {
  availableRoles.value = (await userService.get_roles()).roles;
  availablePermissions.value = (await userService.get_permissions()).permissions;
  await get();
});
</script>
<template>
  <MainCard :title="title" no-toolbar="true">
    <template v-slot:default>
      <UserForm
        class="my-3"
        :disabled="busy"
        :bypass-editable-cell="false"
        :available-roles="availableRoles"
        :available-permissions="availablePermissions"
        :data="item"
        :rules="parsedRules"
        ref="form"
      />
    </template>
  </MainCard>
</template>
<style scoped></style>
