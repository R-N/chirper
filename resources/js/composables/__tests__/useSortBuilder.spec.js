import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useSortBuilder } from "@/composables/useSortBuilder";

const fields = () =>
  ref([
    { value: "name", title: "Name", sortable: true },
    { value: "created_at", title: "Created", sortable: true },
    { value: "secret", title: "Secret", sortable: false },
  ]);

describe("useSortBuilder", () => {
  it("exposes only sortable fields", () => {
    const { sortFields } = useSortBuilder({ normalizedFields: fields() });
    expect(sortFields.value).toEqual([
      { title: "Name", value: "name" },
      { title: "Created", value: "created_at" },
    ]);
  });

  it("seeds sortValues from defaultSort (string or array)", () => {
    expect(useSortBuilder({ defaultSort: "name" }).sortValues.value).toEqual(["name"]);
    expect(
      useSortBuilder({ defaultSort: ["name", "-created_at"] }).sortValues.value
    ).toEqual(["name", "-created_at"]);
    expect(useSortBuilder({}).sortValues.value).toEqual([]);
  });

  it("addSort appends a token and fires onChange", () => {
    const onChange = vi.fn();
    const b = useSortBuilder({ normalizedFields: fields(), onChange });
    b.selectedSortField.value = "name";
    b.selectedSortDirection.value = "asc";
    b.addSort();
    expect(b.sortValues.value).toEqual(["name"]);
    expect(onChange).toHaveBeenCalledOnce();
    // selection resets
    expect(b.selectedSortField.value).toBeNull();
    expect(b.selectedSortDirection.value).toBe("asc");
  });

  it("encodes descending as a -prefixed token", () => {
    const b = useSortBuilder({ normalizedFields: fields() });
    b.selectedSortField.value = "created_at";
    b.selectedSortDirection.value = "desc";
    b.addSort();
    expect(b.sortValues.value).toEqual(["-created_at"]);
  });

  it("re-adding a field replaces its existing direction", () => {
    const b = useSortBuilder({ normalizedFields: fields() });
    b.selectedSortField.value = "name";
    b.addSort();
    b.selectedSortField.value = "name";
    b.selectedSortDirection.value = "desc";
    b.addSort();
    expect(b.sortValues.value).toEqual(["-name"]);
  });

  it("removeSort and clearSorts mutate and notify", () => {
    const onChange = vi.fn();
    const b = useSortBuilder({ normalizedFields: fields(), defaultSort: ["name", "-created_at"], onChange });
    b.removeSort("name");
    expect(b.sortValues.value).toEqual(["-created_at"]);
    b.clearSorts();
    expect(b.sortValues.value).toEqual([]);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("derives chip title and direction labels", () => {
    const b = useSortBuilder({ normalizedFields: fields() });
    expect(b.getSortFieldTitle("name")).toBe("Name");
    expect(b.getSortFieldTitle("-created_at")).toBe("Created");
    expect(b.getSortFieldTitle("unknown")).toBe("unknown");
    expect(b.getSortDirection("name")).toBe("Asc");
    expect(b.getSortDirection("-name")).toBe("Desc");
  });
});
