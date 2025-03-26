<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import { VAlert } from "vuetify/components";

@Component({
  components: {
    VAlert,
  },
})
class InputError extends Vue {
  @Prop({ type: String, default: "" }) message!: string;
}

export default toNative(InputError);
</script>

<template>
  <VAlert v-if="message" type="error" variant="tonal" density="compact">
    {{ message }}
  </VAlert>
</template>
