import { provide, inject } from "vue";

const CRUD_KEY = Symbol("crudContext");

export function provideCrudContext(context) {
  provide(CRUD_KEY, context);
}

export function useCrudContext() {
  const ctx = inject(CRUD_KEY);
  if (!ctx) throw new Error("useCrudContext must be used inside a CrudProvider");
  return ctx;
}
