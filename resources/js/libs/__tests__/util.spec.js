import { describe, expect, it } from "vitest";
import {
  arraysEqual,
  arraysEqualUnordered,
  backendUrl,
  checkCsrfError,
  daysBetween,
  deepAssign,
  deepMerge,
  filterObject,
  getByPath,
  getData,
  isInt,
  isObject,
  selectFilled,
  setByPath,
} from "@/libs/util";

describe("isObject", () => {
  it("treats plain objects as objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });

  it("rejects arrays, null and primitives", () => {
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject("x")).toBe(false);
    expect(isObject(5)).toBe(false);
  });
});

describe("filterObject", () => {
  it("keeps only whitelisted keys", () => {
    expect(filterObject({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("ignores keys that are not present", () => {
    expect(filterObject({ a: 1 }, ["a", "z"])).toEqual({ a: 1 });
  });
});

describe("selectFilled", () => {
  it("returns array length for arrays", () => {
    expect(selectFilled([1, 2, 3])).toBe(3);
    expect(selectFilled([])).toBe(0);
  });

  it("returns the value itself for non-arrays", () => {
    expect(selectFilled("hello")).toBe("hello");
    expect(selectFilled(0)).toBe(0);
  });
});

describe("arraysEqual", () => {
  it("is true for same elements in order", () => {
    expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it("is false for different order, length, or non-arrays", () => {
    expect(arraysEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(arraysEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(arraysEqual(null, [1])).toBe(false);
  });
});

describe("arraysEqualUnordered", () => {
  it("ignores order", () => {
    expect(arraysEqualUnordered([1, 2, 3], [3, 1, 2])).toBe(true);
  });

  it("still respects length and contents", () => {
    expect(arraysEqualUnordered([1, 2], [1, 2, 3])).toBe(false);
    expect(arraysEqualUnordered([1, 2, 2], [1, 1, 2])).toBe(false);
  });
});

describe("isInt", () => {
  it("accepts integers and integer-like strings", () => {
    expect(isInt(5)).toBe(true);
    expect(isInt("42")).toBe(true);
  });

  it("rejects floats and non-numeric input", () => {
    expect(isInt(5.5)).toBe(false);
    expect(isInt("abc")).toBe(false);
  });
});

describe("backendUrl", () => {
  it("builds a scheme-correct url", () => {
    expect(backendUrl(true, "example.com", 443)).toBe("https://example.com:443");
    expect(backendUrl(false, "localhost", 8000)).toBe("http://localhost:8000");
  });
});

describe("daysBetween", () => {
  it("counts whole days between dates", () => {
    expect(daysBetween("2026-01-01", "2026-01-04")).toBe(3);
    expect(daysBetween("2026-01-01", "2026-01-01")).toBe(0);
  });
});

describe("deepAssign / deepMerge", () => {
  it("recursively merges nested objects", () => {
    const result = deepAssign({ a: { x: 1 }, b: 2 }, { a: { y: 3 } });
    expect(result).toEqual({ a: { x: 1, y: 3 }, b: 2 });
  });

  it("overwrites arrays and primitives wholesale", () => {
    expect(deepAssign({ a: [1, 2] }, { a: [3] })).toEqual({ a: [3] });
  });

  it("deepMerge folds a list of objects left to right", () => {
    expect(deepMerge([{ a: 1 }, { b: 2 }, { a: 3 }])).toEqual({ a: 3, b: 2 });
  });
});

describe("getByPath / setByPath", () => {
  it("reads nested values by dotted path", () => {
    expect(getByPath({ a: { b: { c: 7 } } }, "a.b.c")).toBe(7);
  });

  it("returns undefined for a missing path", () => {
    expect(getByPath({ a: {} }, "a.b.c")).toBeUndefined();
  });

  it("writes nested values, creating intermediate objects", () => {
    const obj = {};
    setByPath(obj, "a.b.c", 9);
    expect(obj).toEqual({ a: { b: { c: 9 } } });
  });
});

describe("getData", () => {
  it("unwraps a named key", () => {
    expect(getData({ user: { id: 1 } }, "user")).toEqual({ id: 1 });
  });

  it("falls back through common envelope keys", () => {
    expect(getData({ data: [1, 2] })).toEqual([1, 2]);
    expect(getData({ items: ["a"] })).toEqual(["a"]);
  });

  it("returns null for empty input", () => {
    expect(getData(null)).toBeNull();
  });
});

describe("checkCsrfError", () => {
  it("detects a CSRF message anywhere in the envelope", () => {
    expect(checkCsrfError({ message: "CSRF token mismatch" })).toBe(true);
  });

  it("is falsy for unrelated errors", () => {
    expect(checkCsrfError({ message: "Not found" })).toBeFalsy();
  });
});
