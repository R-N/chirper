<script lang="ts">
import dayjs from "dayjs";
import { Vue, Component, Prop, toNative } from "vue-facing-decorator"

@Component({
  name: "Duration",
  components: {
  }
})
class Duration  extends Vue {
  @Prop({ type: [Number, Date, String] }) time;
  @Prop({ type: [Number, Date, String] }) past;

  duration(time) {
    return dayjs(time).fromNow();
  }
}
export { Duration };
export default toNative(Duration);
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
