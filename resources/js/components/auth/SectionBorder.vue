<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import { VDivider, VExpandTransition } from "vuetify/components";

@Component({
  components: {
    VDivider,
    VExpandTransition,
  },
})
class SectionBorder extends Vue {
  // @Prop({ type: Boolean, required: true }) on;
}

export default toNative(SectionBorder);
</script>

<template>
    <div class="d-none d-sm-block">
        <div class="py-8">
            <VDivider />
        </div>
    </div>
</template>
