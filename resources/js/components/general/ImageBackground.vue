<script setup lang="ts">
defineProps({
  src: { type: String },
});
</script>
<template>
  <img class="bg" :src="src" v-if="src" />
  <slot></slot>
</template>
<style scoped>
.bg {
  background-size: cover;
  opacity: 0.5;
  position: fixed;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
</style>
