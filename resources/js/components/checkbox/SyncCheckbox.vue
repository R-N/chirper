<script setup lang="ts">
import { computed } from "vue";
import { useWorking } from "@/composables/useWorking";
import ConfirmationSlot from "@/components/dialog/ConfirmationSlot.vue";

const props = defineProps({
  name: { type: String },
  label: { type: String },
  showLabel: { default: true },
  value: { type: String },
  confirmTextMaker: { type: [String, Function] },
  disabled: { default: false },
  textEnable: { type: String },
  textDisable: { type: String },
  ask: { default: true },
  onChange: { type: Function },
  modelValue: { type: Boolean, default: false },
  errorMessages: { default: null },
  parentBusy: { default: false },
});

const emit = defineEmits(["update:modelValue", "change"]);

const { busy, releaseBusy, waitBusy } = useWorking(props);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const text = computed(() => inputValue.value ? props.textDisable : props.textEnable);

async function tryAsk(askFn) {
  if (!props.disabled) {
    if (props.ask) await askFn();
    else await change();
  }
}

async function change() {
  if (props.onChange) {
    await waitBusy(
      async () => await props.onChange(!inputValue.value, releaseBusy)
    );
  } else {
    emit("update:modelValue", !inputValue.value, releaseBusy);
    emit("change", !inputValue.value, releaseBusy);
  }
}
</script>
<template>
  <ConfirmationSlot
    class="d-flex text-center justify-center justify-self-center"
    :confirmTextMaker="confirmTextMaker"
    :on-confirm="change"
    :parent-busy="busy"
  >
    <template v-slot="{ ask }">
      <VTooltip bottom :disabled="disabled || !text">
        <template #activator="{ props }">
          <VCheckbox
            v-bind="props"
            :label="showLabel ? label : null"
            :name="name"
            v-model="inputValue"
            :value="value"
            @click.prevent.capture="() => tryAsk(ask)"
            readonly
            class="text-center justify-center justify-self-center"
            :disabled="disabled"
            :error-messages="errorMessages"
          />
        </template>
        <span>{{ text }}</span>
      </VTooltip>
    </template>
  </ConfirmationSlot>
</template>
<style scoped></style>
