import { describe, expect, it } from "vitest";
import { normalizeField, normalizeFields } from "@/libs/fieldSchema";

describe("normalizeField", () => {
  it("applies defaults for a bare field", () => {
    const f = normalizeField({ value: "name" });
    expect(f).toMatchObject({
      value: "name",
      title: "name",
      type: "text",
      table: true,
      form: true,
      editable: false,
      sortable: false,
      filterable: false,
      filterType: null,
      props: {},
    });
  });

  it("derives value from name or key", () => {
    expect(normalizeField({ name: "email" }).value).toBe("email");
    expect(normalizeField({ key: "id" }).value).toBe("id");
  });

  it("derives title from label then value", () => {
    expect(normalizeField({ value: "x", label: "Label" }).title).toBe("Label");
    expect(normalizeField({ value: "x" }).title).toBe("x");
  });

  it("derives sortable/filterable from sort/filter shorthands", () => {
    const f = normalizeField({ value: "name", sort: true, filter: "partial" });
    expect(f.sortable).toBe(true);
    expect(f.filterable).toBe(true);
    expect(f.filterType).toBe("partial");
  });

  it("passes extra/custom props through", () => {
    const f = normalizeField({ value: "role", component: "MyField", extra: 1 });
    expect(f.component).toBe("MyField");
    expect(f.extra).toBe(1);
  });

  it("respects explicit overrides of defaults", () => {
    const f = normalizeField({ value: "x", table: false, editable: true });
    expect(f.table).toBe(false);
    expect(f.editable).toBe(true);
  });
});

describe("normalizeFields", () => {
  it("normalizes every field in a list", () => {
    const out = normalizeFields([{ value: "a" }, { name: "b" }]);
    expect(out).toHaveLength(2);
    expect(out[0].value).toBe("a");
    expect(out[1].value).toBe("b");
    expect(out.every((f) => f.type === "text")).toBe(true);
  });
});
