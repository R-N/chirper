<script setup>
import ApiTokenManager from "@/modules/user/api/views/ApiTokenManager.vue";

defineProps({
  tokens: Array,
  availablePermissions: Array,
  defaultPermissions: Array
});
</script>

<template>
  <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
    <ApiTokenManager
      :tokens="tokens"
      :available-permissions="availablePermissions"
      :default-permissions="defaultPermissions"
    />
  </div>
</template>
