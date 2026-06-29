import { describe, expect, it, vi } from "vitest";

vi.mock("@/plugins/axios", () => ({ default: {} }));
vi.mock("@/plugins/i18n", () => ({ t: (k, p) => (p ? `${k}:${JSON.stringify(p)}` : k) }));

import { CrudService } from "@/services/crud";

const makeAxios = () => ({
  get: vi.fn().mockResolvedValue({ data: { User: { id: 1 } } }),
  post: vi.fn().mockResolvedValue({ data: { User: { id: 1 } } }),
  patch: vi.fn().mockResolvedValue({ data: { User: { id: 1, enabled: false } } }),
  delete: vi.fn().mockResolvedValue({ data: {} }),
});

const make = (over = {}) =>
  new CrudService({
    axios: makeAxios(),
    name: "User",
    endpoint: "/api/users",
    methods: ["get", "post", "patch", "delete"],
    fields: ["enabled", "name"],
    setters: true,
    ...over,
  });

describe("CrudService setters", () => {
  it("generates set_<field> methods for each field", () => {
    const s = make();
    expect(typeof s.set_enabled).toBe("function");
    expect(typeof s.set_name).toBe("function");
  });

  it("set_<field> PATCHes the field as a payload", async () => {
    const axios = makeAxios();
    const s = make({ axios });
    await s.set_enabled({ id: 3 }, false);
    expect(axios.patch).toHaveBeenCalledWith(
      "/api/users/3",
      { enabled: false },
      {}
    );
  });
});

describe("CrudService actions", () => {
  it("builds custom action methods bound to an object", async () => {
    const axios = makeAxios();
    const s = make({
      axios,
      actions: [{ method: "post", action: "reset", endpoint: "/api/users/reset", obj: true }],
    });
    expect(typeof s.reset).toBe("function");
    await s.reset({ id: 5 }, {});
    expect(axios.post).toHaveBeenCalled();
  });
});

describe("CrudService getData", () => {
  it("unwraps the named envelope from a response", () => {
    const s = make();
    expect(s.getData({ user: { id: 9 } })).toEqual({ id: 9 });
    expect(s.getData({ data: { id: 8 } })).toEqual({ id: 8 });
  });
});

describe("CrudService verb aliases", () => {
  it("create/store POST, update PATCHes, destroy DELETEs", async () => {
    const axios = makeAxios();
    const s = make({ axios });
    await s.create({ name: "a" });
    expect(axios.post).toHaveBeenCalled();
    await s.update({ id: 2 }, { name: "b" });
    expect(axios.patch).toHaveBeenCalled();
    await s.destroy({ id: 2 });
    expect(axios.delete).toHaveBeenCalled();
  });

  it("rejects a method outside the allowed list", async () => {
    const s = make({ methods: ["get"] });
    await expect(s.create({ name: "a" })).rejects.toThrowError();
  });
});
