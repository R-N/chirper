export function normalizeField(field) {
  return {
    value: field.value ?? field.name ?? field.key,
    title: field.title ?? field.label ?? field.value,
    type: field.type ?? "text",
    table: field.table ?? true,
    form: field.form ?? true,
    editable: field.editable ?? false,
    sortable: field.sortable ?? field.sort ?? false,
    filterable: field.filterable ?? !!field.filter,
    filterType: field.filterType ?? field.filter ?? null,
    rules: field.rules ?? null,
    props: field.props ?? {},
    ...field,
  };
}

export function normalizeFields(fields) {
  return fields.map(normalizeField);
}
