<script setup>
import { defineProps } from 'vue';
import { VApp } from 'vuetify/components'; 
defineProps({
  InertiaApp: Object,
  props: Object,
});
</script>

<template>
  <v-app>
    <component :is="InertiaApp" v-bind="props" />
  </v-app>
</template>
