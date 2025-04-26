<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import { VAlert, VExpandTransition } from "vuetify/components";

@Component({
  components: {
    VAlert,
    VExpandTransition,
  },
})
class InputError extends Vue {
  @Prop({ type: String, default: "" }) message!: string;

  get messageIsArray(){
    return Array.isArray(this.message);
  }
}

export default toNative(InputError);
</script>

<template>
  <VExpandTransition>
    <VAlert v-if="message" type="error" variant="tonal" density="compact">
      <ul v-if="messageIsArray">
        <li v-for="(msg, i) in message">
          {{ msg }}
        </li>
      </ul>
      <p v-else>{{ message }}</p>
    </VAlert>
  </VExpandTransition>
</template>
