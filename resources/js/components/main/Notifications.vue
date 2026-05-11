<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Link, router } from "@/plugins/inertia";
import { useWorking } from "@/composables/useWorking";
import notificationService from "@/services/notification.js";
import IconButton from "@/components/button/IconButton.vue";
import { deleteFromArray } from "@/libs/util";
import { usePage } from "@/plugins/inertia";

const props = defineProps({
  parentBusy: { default: false },
});

const { busy, waitBusy, isLoggedIn } = useWorking(props);

const selected = ref([]);
const notifications = ref([]);

const notificationCount = computed(() => notifications.value.length);
const readNotifs = computed(() => notifications.value.filter((notif) => notif.read_at !== null));
const unreadNotifs = computed(() => notifications.value.filter((notif) => notif.read_at == null));
const hasReadNotif = computed(() => readNotifs.value.length);
const hasUnreadNotif = computed(() => unreadNotifs.value.length);

async function fetchNotifications() {
  notifications.value = notificationService.getData(
    await notificationService.fetch()
  );
}

async function bulkMarkAsRead() {
  const ids = unreadNotifs.value.map((n) => n.id);
  await waitBusy(async () => {
    await notificationService.bulk_mark_as_read(ids);
    fetchNotifications();
  });
}

async function bulkDestroy() {
  const ids = readNotifs.value.map((n) => n.id);
  await waitBusy(async () => {
    await notificationService.bulk_destroy(ids);
    fetchNotifications();
  });
}

async function markAsRead(notif) {
  await waitBusy(async () => {
    await notificationService.mark_as_read(notif, {});
    fetchNotifications();
  });
}

async function destroy(notif) {
  await waitBusy(async () => {
    await notificationService.destroy(notif);
    deleteFromArray(notifications.value, notif);
    fetchNotifications();
  });
}

onMounted(() => {
  notifications.value =
    usePage()?.props?.notifications ?? [];
  fetchNotifications();
  const intervalId = setInterval(() => {
    if (isLoggedIn.value) fetchNotifications();
    else clearInterval(intervalId);
  }, 30000);
});
</script>
<template>
  <VMenu bottom left close-on-click offset-y>
    <template #activator="{ props }">
      <VBtn icon v-bind="props">
        <VBadge
          overlap
          color="green"
          :content="notificationCount"
          :value="notificationCount"
        >
          <VIcon>mdi-bell</VIcon>
        </VBadge>
      </VBtn>
    </template>
    <VCard class="mx-auto" density="compact">
      <VCardTitle class="d-flex flex-grow-1">
        <VList class="d-flex flex-grow-1 flex-column" density="compact">
          <VListItem class="d-flex-inline flex-grow-1" density="compact">
            <h3 class="fill-height d-flex-inline align-center justify-center">
              {{ $t("notification.title") }}
            </h3>
            <VListItemSubtitle
              class="fill-height d-flex-inline"
              v-if="!notifications.length"
              >{{ $t("notification.empty") }}</VListItemSubtitle
            >
            <VSpacer />
            <template v-slot:append="{}">
              <VListItemAction start>
                <IconButton
                  :disabled="busy"
                  icon="mdi-check"
                  :text="$t('notification.read_all')"
                  @click.stop="bulkMarkAsRead"
                  v-if="hasUnreadNotif"
                />
                <IconButton
                  :disabled="busy"
                  icon="mdi-delete"
                  :text="$t('notification.delete_all')"
                  @click.stop="bulkDestroy"
                  v-if="hasReadNotif"
                />
              </VListItemAction>
            </template>
          </VListItem>
        </VList>
      </VCardTitle>
      <VCardActions class="d-flex flex-grow-1" v-if="notificationCount">
        <VList
          class="d-flex flex-grow-1 flex-column"
          v-model:selected="selected"
          select-strategy="leaf"
          lines="three"
          show-select
          density="compact"
        >
          <VListItem
            class="d-flex-inline flex-grow-1"
            density="compact"
            v-for="(notif, i) in notifications"
            :key="i"
            :value="notif.id"
            @click.stop.prevent="router.visit(notif.data.url ?? '#')"
          >
            <template v-slot:prepend="{ isSelected, select }">
              <VListItemAction start v-if="false">
                <VCheckboxBtn
                  :model-value="isSelected"
                  @click.stop=""
                  @update:model-value="select"
                />
              </VListItemAction>
            </template>
            <VListItemSubtitle>{{ notif.data.title ?? "" }}</VListItemSubtitle>
            <VListItemTitle>{{ notif.data.message ?? "" }}</VListItemTitle>
            <template v-slot:append="{}">
              <VListItemAction start>
                <IconButton
                  :disabled="busy"
                  icon="mdi-check"
                  :text="$t('notification.read')"
                  @click.stop.prevent="() => markAsRead(notif)"
                  v-if="!notif.read_at"
                />
                <IconButton
                  :disabled="busy"
                  icon="mdi-delete"
                  :text="$t('form.delete')"
                  @click.stop.prevent="() => destroy(notif)"
                  v-if="notif.read_at"
                />
              </VListItemAction>
            </template>
          </VListItem>
        </VList>
      </VCardActions>
    </VCard>
  </VMenu>
</template>
<style scoped></style>
