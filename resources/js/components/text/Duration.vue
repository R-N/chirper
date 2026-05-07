<script setup lang="ts">
import dayjs from "dayjs";

defineProps({
  time: { type: [Number, Date, String] },
  past: { type: [Number, Date, String] },
});

function duration(time) {
  return dayjs(time).fromNow();
}
</script>
<template>
  <div class="inline-flex items-center">
    <small class="ml-2 text-sm text-gray-600">
      {{ duration(time) }}
    </small>
    <small
      v-if="past && time !== past"
      class="text-sm text-gray-600"
    >
      &middot; {{ $t("crud.edited") }}
    </small>
  </div>
</template>
