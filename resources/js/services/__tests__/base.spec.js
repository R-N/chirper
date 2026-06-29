import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/plugins/axios", () => ({ default: {} }));
vi.mock("@/plugins/i18n", () => ({ t: (k, p) => (p ? `${k}:${JSON.stringify(p)}` : k) }));

import BaseService from "@/services/base";

const makeAxios = () => ({
  get: vi.fn().mockResolvedValue({ data: { item: { id: 1 } } }),
  post: vi.fn().mockResolvedValue({ data: { item: { id: 1 } } }),
  put: vi.fn().mockResolvedValue({ data: { item: { id: 1 } } }),
  patch: vi.fn().mockResolvedValue({ data: { item: { id: 1 } } }),
  delete: vi.fn().mockResolvedValue({ data: {} }),
});

const make = (over = {}) =>
  new BaseService({ axios: makeAxios(), endpoint: "/api/users", name: "User", ...over });

describe("BaseService.endpoint", () => {
  it("returns the base path when no id", () => {
    expect(make().endpoint()).toBe("/api/users");
  });
  it("appends an id from an object or scalar", () => {
    const s = make();
    expect(s.endpoint({ id: 5 })).toBe("/api/users/5");
    expect(s.endpoint(7)).toBe("/api/users/7");
  });
  it("honours a per-call endpoint override", () => {
    expect(make().endpoint(3, "/api/admins")).toBe("/api/admins/3");
  });
});

describe("BaseService.checkMethod", () => {
  it("passes when the method is whitelisted (or list empty)", () => {
    expect(make({ methods: ["get", "post"] }).checkMethod("get")).toBe(true);
    expect(make({ methods: [] }).checkMethod("delete")).toBe(true);
  });
  it("throws a showable error for a disallowed method", () => {
    expect(() => make({ methods: ["get"] }).checkMethod("delete")).toThrowError();
    try {
      make({ methods: ["get"] }).checkMethod("delete");
    } catch (e) {
      expect(e.show).toBe(true);
    }
  });
});

describe("BaseService.call HTTP-method resolution", () => {
  it("resolves index/fetch to GET", async () => {
    const axios = makeAxios();
    const s = new BaseService({ axios, endpoint: "/api/users", name: "User" });
    await s.call("/api/users", {}, "index");
    expect(axios.get).toHaveBeenCalled();
  });
  it("resolves create/store to POST", async () => {
    const axios = makeAxios();
    const s = new BaseService({ axios, endpoint: "/api/users", name: "User" });
    await s.call("/api/users", { name: "a" }, "create");
    expect(axios.post).toHaveBeenCalled();
  });
  it("resolves update to the configured updateMethod", async () => {
    const axios = makeAxios();
    const s = new BaseService({ axios, endpoint: "/api/users", name: "User", updateMethod: "patch" });
    await s.call("/api/users", { name: "a" }, "update", false, { id: 2 });
    expect(axios.patch).toHaveBeenCalled();
  });
  it("sends delete with a data payload", async () => {
    const axios = makeAxios();
    const s = new BaseService({ axios, endpoint: "/api/users", name: "User" });
    await s.delete(null, { reason: "x" }, { id: 4 });
    expect(axios.delete).toHaveBeenCalledWith(
      "/api/users/4",
      { data: { reason: "x" } },
      {}
    );
  });
});

describe("BaseService.call side effects", () => {
  it("merges the response back into the passed object", async () => {
    const axios = makeAxios();
    axios.patch.mockResolvedValue({ data: { item: { id: 2, name: "fresh" } } });
    const s = new BaseService({ axios, endpoint: "/api/users", name: "User", updateMethod: "patch" });
    const obj = { id: 2, name: "stale" };
    await s.call("/api/users", { name: "fresh" }, "update", false, obj);
    expect(obj.name).toBe("fresh");
  });

  it("binds API validation errors onto the form object", async () => {
    const axios = makeAxios();
    const err = { response: { data: { errors: { name: ["required"] } } } };
    axios.post.mockRejectedValue(err);
    const s = new BaseService({ axios, endpoint: "/api/users", name: "User" });
    const form = { name: "", setErrors: vi.fn(), clearErrors: vi.fn() };
    await expect(s.post(null, form)).rejects.toBe(err);
    expect(form.clearErrors).toHaveBeenCalled();
    expect(form.setErrors).toHaveBeenCalledWith({ name: ["required"] });
  });
});
