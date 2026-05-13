<script setup lang="ts">
import { ref } from "vue";
import MediaViewer from "@/components/media/MediaViewer.vue";

const props = defineProps<{
  value?: string | null;
  data?: Record<string, any>;
  disabled?: boolean;
}>();

const viewerOpen = ref(false);

function getFilename() {
  if (!props.value) return null;
  const parts = props.value.split("/");
  return parts[parts.length - 1];
}

function getPhotoUrl() {
  if (props.data?.photo_url) return props.data.photo_url;
  if (!props.value) return null;
  if (props.value.startsWith("http")) return props.value;
  return "/storage/" + props.value;
}
</script>

<template>
  <div v-if="value">
    <a
      href="#"
      class="photo-link"
      @click.prevent.stop="viewerOpen = true"
    >{{ getFilename() }}</a>
    <MediaViewer
      v-model="viewerOpen"
      :src="getPhotoUrl()"
    />
  </div>
  <span v-else class="text-grey">—</span>
</template>

<style scoped>
.photo-link {
  color: #1976d2;
  text-decoration: none;
}
.photo-link:hover {
  text-decoration: underline;
}
</style>
