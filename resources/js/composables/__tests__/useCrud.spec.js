import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";

// i18n: echo key + interpolation so we can assert what was passed.
vi.mock("@/plugins/i18n", () => ({
  t: (key, params) => (params ? `${key}:${JSON.stringify(params)}` : key),
}));

import { useCrud } from "@/composables/useCrud";

// waitBusy just runs the work; client echoes data through getData.
const makeClient = (over = {}) => ({
  getData: (x) => x,
  ...over,
});
const waitBusy = (fn) => fn();
const make = (clientOver) =>
  useCrud({ client: makeClient(clientOver), waitBusy });

describe("useCrud", () => {
  it("storeItem appends only new ids", () => {
    const c = make();
    const items = ref([{ id: 1 }]);
    c.storeItem({ id: 2 }, items);
    c.storeItem({ id: 1 }, items); // dup ignored
    expect(items.value.map((i) => i.id)).toEqual([1, 2]);
  });

  it("deleteItem removes by identity", () => {
    const c = make();
    const a = { id: 1 };
    const items = ref([a, { id: 2 }]);
    c.deleteItem(a, items);
    expect(items.value.map((i) => i.id)).toEqual([2]);
  });

  it("create posts then stores the returned record", async () => {
    const create = vi.fn().mockResolvedValue({ id: 9, name: "new" });
    const c = make({ create });
    const items = ref([]);
    const data = await c.create({ name: "new" }, { items });
    expect(create).toHaveBeenCalledOnce();
    expect(data).toEqual({ id: 9, name: "new" });
    expect(items.value).toEqual([{ id: 9, name: "new" }]);
  });

  it("delete2 calls client.delete and drops the item", async () => {
    const del = vi.fn().mockResolvedValue(true);
    const c = make({ delete: del });
    const item = { id: 3 };
    const items = ref([item]);
    await c.delete2(item, { items });
    expect(del).toHaveBeenCalledWith(item);
    expect(items.value).toEqual([]);
  });

  it("setField calls set_<field> and writes the response value back", async () => {
    const set_enabled = vi.fn().mockResolvedValue({ enabled: false });
    const c = make({ set_enabled });
    const item = { id: 1, enabled: true };
    await c.setField("enabled", item, false);
    expect(set_enabled).toHaveBeenCalledWith(item, false);
    expect(item.enabled).toBe(false);
  });

  it("setField falls back to the passed value when response is not an object", async () => {
    const set_name = vi.fn().mockResolvedValue("ok");
    const c = make({ set_name });
    const item = { id: 1, name: "old" };
    await c.setField("name", item, "new");
    expect(item.name).toBe("new");
  });

  it("toggleField flips the current flag when no explicit value", async () => {
    const set_enabled = vi.fn().mockResolvedValue("ok");
    const c = make({ set_enabled });
    const item = { id: 1, enabled: true };
    await c.toggleField("enabled", item, null);
    expect(set_enabled).toHaveBeenCalledWith(item, false);
  });

  it("clearField nulls the field when response is not an object", async () => {
    const clear_password = vi.fn().mockResolvedValue("ok");
    const c = make({ clear_password });
    const item = { id: 1, password: "x" };
    await c.clearField("password", item);
    expect(item.password).toBeNull();
  });

  it("action runs the named client method and onSuccess", async () => {
    const reset = vi.fn().mockResolvedValue("done");
    const onSuccess = vi.fn();
    const c = make({ reset });
    const ret = await c.action("reset", { id: 1 }, onSuccess);
    expect(ret).toBe("done");
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it("confirm-text helpers interpolate the item name", () => {
    const c = make();
    expect(c.deleteConfirmText({ name: "Tweet" })).toContain("Tweet");
    expect(c.setFieldConfirmText("enabled", { name: "Tweet" }, true)).toContain("enabled");
    expect(c.toggleFieldConfirmText("enabled", "off", "on", { name: "Tweet", enabled: false })).toContain("on");
  });
});
