import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";

const getMock = vi.fn();
vi.mock("axios", () => ({ default: { get: (...a) => getMock(...a) } }));

import { useFilterBuilder } from "@/composables/useFilterBuilder";

const fields = () =>
  ref([
    { name: "status", label: "Status", values: ["a", "b"] },
    { name: "owner", label: "Owner", type: "autocomplete", endpoint: "/api/owners" },
  ]);

describe("useFilterBuilder", () => {
  it("offers all filters initially, excluding active ones", () => {
    const b = useFilterBuilder({ filterFields: fields() });
    expect(b.availableFiltersForSelect.value).toEqual([
      { title: "Status", value: "status" },
      { title: "Owner", value: "owner" },
    ]);
    b.selectedFilterToAdd.value = "status";
    b.addActiveFilter();
    expect(b.availableFiltersForSelect.value).toEqual([
      { title: "Owner", value: "owner" },
    ]);
  });

  it("addActiveFilter activates a filter and resets the selector", () => {
    const b = useFilterBuilder({ filterFields: fields() });
    b.selectedFilterToAdd.value = "status";
    b.addActiveFilter();
    expect(b.activeFilterNames.value).toEqual(["status"]);
    expect(b.selectedFilterToAdd.value).toBeNull();
  });

  it("ignores duplicate or empty activation", () => {
    const b = useFilterBuilder({ filterFields: fields() });
    b.selectedFilterToAdd.value = "status";
    b.addActiveFilter();
    b.selectedFilterToAdd.value = "status";
    b.addActiveFilter();
    b.selectedFilterToAdd.value = "";
    b.addActiveFilter();
    expect(b.activeFilterNames.value).toEqual(["status"]);
  });

  it("resolves active filter definitions", () => {
    const b = useFilterBuilder({ filterFields: fields() });
    b.activeFilterNames.value = ["owner"];
    expect(b.activeFilterDefs.value).toHaveLength(1);
    expect(b.activeFilterDefs.value[0].name).toBe("owner");
  });

  it("removeActiveFilter clears value and notifies", () => {
    const onChange = vi.fn();
    const b = useFilterBuilder({ filterFields: fields(), onChange });
    b.activeFilterNames.value = ["status"];
    b.filterValues.value.status = "a";
    b.removeActiveFilter("status");
    expect(b.activeFilterNames.value).toEqual([]);
    expect(b.filterValues.value.status).toBeUndefined();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("clearAllActiveFilters resets everything and notifies", () => {
    const onChange = vi.fn();
    const b = useFilterBuilder({ filterFields: fields(), onChange });
    b.activeFilterNames.value = ["status", "owner"];
    b.filterValues.value = { status: "a", owner: 1 };
    b.clearAllActiveFilters();
    expect(b.activeFilterNames.value).toEqual([]);
    expect(b.filterValues.value).toEqual({});
    expect(b.selectedFilterToAdd.value).toBeNull();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("loadAutocompletes fetches endpoint-backed filters", async () => {
    getMock.mockResolvedValueOnce({ data: { items: { data: [{ id: 1 }, { id: 2 }] } } });
    const b = useFilterBuilder({ filterFields: fields() });
    await b.loadAutocompletes();
    expect(getMock).toHaveBeenCalledWith("/api/owners", { params: { per_page: 100 } });
    expect(b.autocompleteItems.value.owner).toEqual([{ id: 1 }, { id: 2 }]);
    expect(b.autocompleteLoading.value.owner).toBe(false);
  });

  it("loadAutocompletes degrades to an empty list on error", async () => {
    getMock.mockRejectedValueOnce(new Error("boom"));
    const b = useFilterBuilder({ filterFields: fields() });
    await b.loadAutocompletes();
    expect(b.autocompleteItems.value.owner).toEqual([]);
  });
});
