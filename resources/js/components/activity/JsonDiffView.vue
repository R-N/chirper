<script setup lang="ts">
import { computed } from "vue";
import { VChip, VTable } from "vuetify/components";

const props = defineProps<{
  properties?: Record<string, any>;
}>();

interface DiffEntry {
  attribute: string;
  old: string;
  new: string;
}

const diffs = computed<DiffEntry[]>(() => {
  const props_ = props.properties ?? {};
  const attributes = props_.attributes ?? {};
  const old = props_.old ?? {};
  const entries: DiffEntry[] = [];

  const allKeys = new Set([...Object.keys(attributes), ...Object.keys(old)]);
  for (const key of allKeys) {
    entries.push({
      attribute: key,
      old: formatValue(old[key]),
      new: formatValue(attributes[key]),
    });
  }

  return entries;
});

const hasDiffs = computed(() => diffs.value.length > 0);

const otherProps = computed(() => {
  const props_ = props.properties ?? {};
  const { attributes, old, ...rest } = props_;
  return Object.keys(rest).length > 0 ? rest : null;
});

function formatValue(val: any): string {
  if (val === null || val === undefined) return "-";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
}
</script>
<template>
  <div v-if="hasDiffs">
    <h3 class="text-subtitle-1 mb-2">Changed Attributes</h3>
    <VTable density="compact">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Old</th>
          <th>New</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in diffs" :key="d.attribute">
          <td class="font-weight-bold">{{ d.attribute }}</td>
          <td class="text-error">{{ d.old }}</td>
          <td class="text-success">{{ d.new }}</td>
        </tr>
      </tbody>
    </VTable>
  </div>
  <div v-if="otherProps">
    <h3 class="text-subtitle-1 mb-2 mt-4">Additional Properties</h3>
    <div v-for="(val, key) in otherProps" :key="key" class="d-flex ga-3 mb-1">
      <VChip size="small">{{ key }}</VChip>
      <span>{{ formatValue(val) }}</span>
    </div>
  </div>
  <div v-if="!hasDiffs && !otherProps" class="text-medium-emphasis">
    No additional details.
  </div>
</template>
