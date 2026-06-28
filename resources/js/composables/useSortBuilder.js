import { computed, ref } from "vue";

/**
 * Sort-builder state for DeclarativeCrudView's sort controls.
 * Manages the list of active sort tokens (e.g. "name", "-created_at"),
 * the in-progress field/direction selection, and the add/remove actions.
 *
 * @param {object}   opts
 * @param {import("vue").Ref<any[]>} opts.normalizedFields  reactive normalized fields
 * @param {string|string[]} [opts.defaultSort]              initial sort token(s)
 * @param {Function} [opts.onChange]                        called after any mutation
 */
export function useSortBuilder({ normalizedFields, defaultSort, onChange } = {}) {
  const normalize = (value) =>
    !value ? [] : Array.isArray(value) ? value : [value];

  const sortValues = ref(normalize(defaultSort));
  const selectedSortField = ref(null);
  const selectedSortDirection = ref("asc");

  const sortDirections = [
    { title: "Asc", value: "asc", icon: "mdi-sort-ascending" },
    { title: "Desc", value: "desc", icon: "mdi-sort-descending" },
  ];

  const sortFields = computed(() =>
    (normalizedFields?.value || [])
      .filter((f) => f.sortable)
      .map((f) => ({ title: f.title, value: f.value }))
  );

  const sortFieldName = (value) =>
    value.startsWith("-") ? value.slice(1) : value;

  const sortToken = (field, direction) =>
    direction === "desc" ? `-${field}` : field;

  const getSortFieldTitle = (value) => {
    const field = sortFields.value.find((f) => f.value === sortFieldName(value));
    return field?.title ?? sortFieldName(value);
  };

  const getSortDirection = (value) => (value.startsWith("-") ? "Desc" : "Asc");

  function addSort() {
    if (!selectedSortField.value) return;
    const field = selectedSortField.value;
    sortValues.value = [
      ...sortValues.value.filter((value) => sortFieldName(value) !== field),
      sortToken(field, selectedSortDirection.value),
    ];
    selectedSortField.value = null;
    selectedSortDirection.value = "asc";
    onChange?.();
  }

  function removeSort(value) {
    sortValues.value = sortValues.value.filter((item) => item !== value);
    onChange?.();
  }

  function clearSorts() {
    sortValues.value = [];
    onChange?.();
  }

  return {
    sortValues,
    selectedSortField,
    selectedSortDirection,
    sortDirections,
    sortFields,
    sortFieldName,
    sortToken,
    getSortFieldTitle,
    getSortDirection,
    addSort,
    removeSort,
    clearSorts,
  };
}
