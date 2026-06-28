<script setup lang="ts">
import { computed, ref } from "vue";
import { useCrudContext } from "@/composables/useCrudContext";
import { resolveCellComponent } from "@/libs/fieldRegistry";
import { useWorking } from "@/composables/useWorking";
import { makeBindings, combineCollection } from "@/libs/util";
import ConfirmationSlot from "@/components/dialog/ConfirmationSlot.vue";
import IconButton from "@/components/button/IconButton.vue";
import { t } from "@/plugins/i18n";

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

const { busy } = useWorking(props);

let injectedCrud = null;
try { injectedCrud = useCrudContext(); } catch { /* no provider — fall back to props */ }
const crud = computed(() => injectedCrud || props.crud);

const name = computed(() => props.field.name ?? props.field.value);
const _rules = computed(() => combineCollection(props.rules, props.rules[name.value]));
const disabled = computed(() => busy.value);
const isBypass = computed(() => props.bypassEditableCell || props.field.bypassEditableCell || !!props.field.component);
const isCustomComponent = computed(() => !!props.field.component);
const showTitle_ = computed(() => props.field.showTitle ?? props.showTitle ?? false);

const currentValue = computed(() =>
  props.formData ? props.formData[name.value] : props.data?.[name.value]
);

const displayValue = computed(() => {
  const val = currentValue.value;
  if (props.field.getValue) return props.field.getValue(val);
  return val;
});

const onFinish = computed(() =>
  props.field.onFinish ?? ((value: any) => crud.value?.setField(name.value, props.data, value))
);

const component = computed(() => {
  if (props.field.component) return props.field.component;
  if (props.field.type) return resolveCellComponent(props.field.type);
  return resolveCellComponent("text");
});

// Editing state for table mode
const editing = ref(false);
const editValue = ref<any>(null);

function startEdit() {
  editValue.value = currentValue.value;
  editing.value = true;
}

function cancelEdit() {
  editing.value = false;
}

function changed() {
  return editValue.value !== currentValue.value;
}

function doSave() {
  onFinish.value(editValue.value);
  editing.value = false;
}

function confirmTextMaker(value: any) {
  if (props.field.confirmTextMaker) return props.field.confirmTextMaker(props.data, value);
  return crud.value?.setFieldConfirmText?.(name.value, props.data, value);
}

function finishEdit(askFn: any = null) {
  if (!changed()) {
    cancelEdit();
    return;
  }
  if (askFn) {
    askFn();
  } else {
    doSave();
  }
}

function onEnter(e: KeyboardEvent, ask: any) {
  const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
  if (e.key === "Enter" && !e.shiftKey && tag !== "textarea") {
    finishEdit(ask);
  }
}

function updateValue(val: any) {
  if (props.formData) {
    props.formData[name.value] = val;
  }
}

function makeBindingsHelper(f: any = null, data: any = null) {
  return makeBindings(f ?? props.field, data ?? props.data);
}
</script>
<template>
  <!-- Table mode with custom component that supports editing (editable: true + component) -->
  <ConfirmationSlot
    v-if="field.editable && isCustomComponent"
    style="width: 100%"
    :confirm-text-maker="() => confirmTextMaker(editValue)"
    :on-confirm="doSave"
    :on-cancel="cancelEdit"
    v-slot="{ ask }"
  >
    <div v-if="showTitle_" class="d-flex">
      <span class="font-weight-bold">{{ field.title ?? field.label }}</span>
    </div>
    <div
      class="d-flex align-center justify-space-between"
      @keydown.enter="(e: KeyboardEvent) => onEnter(e, ask)"
    >
      <!-- Edit mode: field input -->
      <span v-if="editing" class="flex-grow-1">
        <component
          :is="component"
          :model-value="editValue"
          @update:model-value="(val: any) => (editValue = val)"
          :label="showTitle_ ? undefined : field.label"
          :name="name"
          :disabled="disabled"
          :required="field.required"
          :rules="_rules"
          :error-messages="formData?.errors?.[name]"
          :editing="true"
          :data="data"
          v-bind="makeBindingsHelper(field, data || formData)"
          class="bigger-input"
        />
      </span>
      <!-- Display mode: use currentValue (field renders its own display) -->
      <component
        v-else
        :is="component"
        :model-value="currentValue"
        :data="data"
        :label="showTitle_ ? undefined : field.label"
        :disabled="disabled"
        :editing="false"
        class="flex-grow-1 bigger-input"
      />
      <!-- Edit/save/cancel buttons -->
      <span v-if="!disabled" class="flex-grow-0 flex-shrink-0">
        <template v-if="editing">
          <IconButton
            @click.prevent.stop="finishEdit(ask)"
            :disabled="disabled"
            icon="mdi-check"
            :text="t('form.save')"
          />
          <IconButton
            @click.prevent.stop="cancelEdit"
            :disabled="disabled"
            icon="mdi-cancel"
            :text="t('form.cancel')"
          />
        </template>
        <IconButton
          v-else
          @click.prevent.stop="startEdit"
          :disabled="disabled"
          icon="mdi-pencil"
          :text="t('form.edit')"
        />
      </span>
    </div>
  </ConfirmationSlot>

  <!-- Custom component without editing: pass old-style props -->
  <component
    v-else-if="isCustomComponent"
    :is="component"
    :disabled="disabled"
    :data="data"
    :rules="_rules"
    :parent-busy="busy"
    :error-messages="formData?.errors?.[name]"
    :required="field.required"
    :show-title="showTitle_"
    :bypass="isBypass"
    :name="name"
    :label="field.label"
    :title="field.label"
    :value="currentValue"
    :on-finish="onFinish"
    v-bind="makeBindingsHelper(field, data || formData)"
    class="bigger-input"
  />

  <!-- Bypass mode (form): thin Field component, no editing chrome -->
  <component
    v-else-if="isBypass"
    :is="component"
    :model-value="currentValue"
    @update:model-value="(val: any) => updateValue(val)"
    :label="field.label"
    :name="name"
    :disabled="disabled"
    :required="field.required"
    :rules="_rules"
    :error-messages="formData?.errors?.[name]"
    :data="data"
    v-bind="makeBindingsHelper(field, data || formData)"
    class="bigger-input"
  />

  <!-- Table mode: editing chrome with display/edit states -->
  <ConfirmationSlot
    v-else
    style="width: 100%"
    :confirm-text-maker="() => confirmTextMaker(editValue)"
    :on-confirm="doSave"
    :on-cancel="cancelEdit"
    v-slot="{ ask }"
  >
    <div v-if="showTitle_" class="d-flex">
      <span class="font-weight-bold">{{ field.title ?? field.label }}</span>
    </div>
    <div
      class="d-flex align-center justify-space-between"
      @keydown.enter="(e: KeyboardEvent) => onEnter(e, ask)"
    >
      <!-- Edit mode: field input -->
      <span v-if="editing" class="flex-grow-1">
        <component
          :is="component"
          :model-value="editValue"
          @update:model-value="(val: any) => (editValue = val)"
          :label="showTitle_ ? undefined : field.label"
          :name="name"
          :disabled="disabled"
          :required="field.required"
          :rules="_rules"
          :error-messages="formData?.errors?.[name]"
          v-bind="makeBindingsHelper(field, data || formData)"
          class="bigger-input"
        />
      </span>
      <!-- Display mode: text -->
      <span v-else class="flex-grow-1 bigger-input">{{ displayValue }}</span>
      <!-- Edit/save/cancel buttons -->
      <span v-if="!disabled && field.editable" class="flex-grow-0 flex-shrink-0">
        <template v-if="editing">
          <IconButton
            @click.prevent.stop="finishEdit(ask)"
            :disabled="disabled"
            icon="mdi-check"
            :text="t('form.save')"
          />
          <IconButton
            @click.prevent.stop="cancelEdit"
            :disabled="disabled"
            icon="mdi-cancel"
            :text="t('form.cancel')"
          />
        </template>
        <IconButton
          v-else
          @click.prevent.stop="startEdit"
          :disabled="disabled"
          icon="mdi-pencil"
          :text="t('form.edit')"
        />
      </span>
    </div>
  </ConfirmationSlot>
</template>
<style scoped></style>
