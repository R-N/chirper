<script setup>
import ApiTokenManager from "@/modules/user/api/views/ApiTokenManager.vue";
import AppLayout from "@/layouts/AppLayout.vue";

defineProps({
  tokens: Array,
  availablePermissions: Array,
  defaultPermissions: Array
});
</script>

<template>
  <AppLayout :title="$t('api_token.title')">
    <template #header>
      <h2
        class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
      >
        {{ $t("api_token.title") }}
      </h2>
    </template>

    <div>
      <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <ApiTokenManager
          :tokens="tokens"
          :available-permissions="availablePermissions"
          :default-permissions="defaultPermissions"
        />
      </div>
    </div>
  </AppLayout>
</template>
