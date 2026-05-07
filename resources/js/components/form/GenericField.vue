<script setup lang="ts">
import { computed } from "vue";
import { useCrudContext } from "@/composables/useCrudContext";
import { resolveCellComponent } from "@/libs/fieldRegistry";
import { useWorking } from "@/composables/useWorking";
import { makeBindings, combineCollection } from "@/libs/util";

const props = defineProps({
  crud: { type: Object },
  field: { type: Object },
  data: { type: Object },
  formData: { type: Object },
  rules: { type: [Object, Array] },
  showTitle: { type: Boolean },
  bypassEditableCell: { type: Boolean },
  parentBusy: { default: false },
});

const emit = defineEmits(["submit"]);

const { busy } = useWorking(props);

const crud = computed(() => {
  try { return useCrudContext(); } catch { return props.crud; }
});

const select = computed(() => props.field.select ?? props.field.value ?? props.field.name);
const _rules = computed(() => combineCollection(props.rules, props.rules[props.field.name ?? props.field.value]));
const model = computed(() => props.field.model ?? props.field.value ?? props.field.name);
const name = computed(() => props.field.name ?? props.field.value);
const disabled = computed(() => busy.value);
const store = computed(() => props.field.onStore || crud.value?.storeItem);
const confirmTextMaker = computed(() =>
  props.field.confirmTextMaker
    ? (value) => props.field.confirmTextMaker(props.data, value)
    : (value) => crud.value?.setFieldConfirmText(
        props.field.value ?? props.field.name,
        props.data, value,
        props.field.getValue
      )
);
const value = computed(() => props.formData ? props.formData[name.value] : props.data?.[name.value]);
const onFinish = computed(() =>
  props.field.onFinish ?? ((value) => crud.value?.setField(props.field.name, props.data, value))
);
const component = computed(() => {
  if (props.field.component) return props.field.component;
  if (props.field.type) return resolveCellComponent(props.field.type);
  return resolveCellComponent("text");
});

function makeBindingsHelper(f = null, data = null) {
  return makeBindings(f ?? props.field, data ?? props.data);
}
</script>
<template>
  <component
    :is="component"
    :disabled="disabled"
    :data="data"
    :rules="_rules"
    :select="select"
    @store="store"
    v-bind="makeBindingsHelper(field, data || formData)"
    :confirmTextMaker="confirmTextMaker"
    :parent-busy="busy"
    :error-messages="formData?.errors[name]"
    :required="field.required"
    :show-title="field.showTitle ?? showTitle"
    :bypass="bypassEditableCell || field.bypassEditableCell"
    :name="field.name"
    class="bigger-input"
    :label="field.label"
    :title="field.label"
    :value="value"
    :on-finish="onFinish"
  />
</template>
<style scoped></style>
