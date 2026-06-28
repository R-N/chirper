import axios from "axios";
import { computed, onMounted, ref } from "vue";

/**
 * Filter-builder state for DeclarativeCrudView's filter controls.
 * Tracks which opt-in filters are active, their current values, and
 * preloads autocomplete option lists. Mutations invoke onChange so the
 * owning view can rebuild the query.
 *
 * @param {object}   opts
 * @param {import("vue").Ref<any[]>} opts.filterFields  reactive filter-field defs
 * @param {Function} [opts.onChange]                    called after any mutation
 */
export function useFilterBuilder({ filterFields, onChange } = {}) {
  const fields = () => filterFields?.value || [];

  const filterValues = ref({});
  /** Filter field keys currently shown (opt-in; empty until user adds). */
  const activeFilterNames = ref([]);
  const selectedFilterToAdd = ref(null);

  const autocompleteItems = ref({});
  const autocompleteLoading = ref({});

  const availableFiltersForSelect = computed(() =>
    fields()
      .filter((ff) => !activeFilterNames.value.includes(String(ff.name)))
      .map((ff) => ({ title: ff.label, value: String(ff.name) }))
  );

  const activeFilterDefs = computed(() =>
    activeFilterNames.value
      .map((name) => fields().find((ff) => String(ff.name) === String(name)))
      .filter(Boolean)
  );

  function addActiveFilter() {
    const raw = selectedFilterToAdd.value;
    const name = raw == null || raw === "" ? "" : String(raw);
    if (!name || activeFilterNames.value.includes(name)) return;
    activeFilterNames.value = [...activeFilterNames.value, name];
    selectedFilterToAdd.value = null;
  }

  function removeActiveFilter(name) {
    activeFilterNames.value = activeFilterNames.value.filter((n) => n !== name);
    delete filterValues.value[name];
    onChange?.();
  }

  function clearAllActiveFilters() {
    for (const name of activeFilterNames.value) {
      delete filterValues.value[name];
    }
    activeFilterNames.value = [];
    selectedFilterToAdd.value = null;
    onChange?.();
  }

  async function loadAutocompletes() {
    for (const ff of fields()) {
      if (ff.type === "autocomplete" && ff.endpoint) {
        autocompleteLoading.value[ff.name] = true;
        try {
          const res = await axios.get(ff.endpoint, { params: { per_page: 100 } });
          let data =
            res.data?.items?.data ?? res.data?.data ?? res.data?.items ?? res.data;
          if (data && !Array.isArray(data) && data.data) data = data.data;
          autocompleteItems.value[ff.name] = Array.isArray(data) ? data : [];
        } catch {
          autocompleteItems.value[ff.name] = [];
        } finally {
          autocompleteLoading.value[ff.name] = false;
        }
      }
    }
  }

  onMounted(loadAutocompletes);

  return {
    filterValues,
    activeFilterNames,
    selectedFilterToAdd,
    autocompleteItems,
    autocompleteLoading,
    availableFiltersForSelect,
    activeFilterDefs,
    addActiveFilter,
    removeActiveFilter,
    clearAllActiveFilters,
    loadAutocompletes,
  };
}
