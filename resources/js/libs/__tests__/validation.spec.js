import { describe, expect, it } from "vitest";
import {
  mergeRules,
  parseLaravelRules,
  ruleMapper,
  wrapOptional,
} from "@/libs/validation";

describe("ruleMapper", () => {
  it("required rejects empty, accepts truthy", () => {
    const fn = ruleMapper.required();
    expect(fn("")).toBe("This field is required");
    expect(fn("x")).toBe(true);
  });

  it("max checks string length and numeric value", () => {
    const fn = ruleMapper.max(3);
    expect(fn("abc")).toBe(true);
    expect(fn("abcd")).toBe("Maximum allowed is 3");
    expect(fn(2)).toBe(true);
    expect(fn(4)).toBe("Maximum allowed is 3");
  });

  it("integer accepts integers, rejects decimals", () => {
    expect(ruleMapper.integer()("5")).toBe(true);
    expect(ruleMapper.integer()("5.5")).toBe("Must be an integer");
  });

  it("in restricts to a comma list", () => {
    const fn = ruleMapper.in("a,b,c");
    expect(fn("b")).toBe(true);
    expect(fn("z")).toBe("Must be one of: a, b, c");
  });

  it("email validates address shape", () => {
    expect(ruleMapper.email()("a@b.co")).toBe(true);
    expect(ruleMapper.email()("nope")).toBe("Invalid email address");
  });
});

describe("wrapOptional", () => {
  it("skips validation for empty values when not required", () => {
    const fn = wrapOptional(ruleMapper.integer(), false);
    expect(fn("")).toBe(true);
    expect(fn(null)).toBe(true);
    expect(fn(undefined)).toBe(true);
  });

  it("still validates non-empty values", () => {
    const fn = wrapOptional(ruleMapper.integer(), false);
    expect(fn("x")).toBe("Must be an integer");
  });

  it("validates empty values when required", () => {
    const fn = wrapOptional(ruleMapper.required(), true);
    expect(fn("")).toBe("This field is required");
  });
});

describe("parseLaravelRules", () => {
  it("returns [] for empty input", () => {
    expect(parseLaravelRules(null)).toEqual([]);
    expect(parseLaravelRules("")).toEqual([]);
  });

  it("parses a pipe string into rule functions", () => {
    const rules = parseLaravelRules("required|integer");
    expect(rules).toHaveLength(2);
    expect(rules.every((r) => typeof r === "function")).toBe(true);
  });

  it("an optional field passes when empty but fails on bad input", () => {
    const [email] = parseLaravelRules("email");
    expect(email("")).toBe(true);
    expect(email("bad")).toBe("Invalid email address");
    expect(email("a@b.co")).toBe(true);
  });

  it("a required field rejects empty", () => {
    const [required] = parseLaravelRules("required|string");
    expect(required("")).toBe("This field is required");
  });

  it("parses parameterized rules like max:N", () => {
    const rules = parseLaravelRules("required|max:2");
    const max = rules[1];
    expect(max("ab")).toBe(true);
    expect(max("abc")).toBe("Maximum allowed is 2");
  });

  it("ignores unknown rules", () => {
    expect(parseLaravelRules("required|sometimes|bail")).toHaveLength(1);
  });

  it("maps an object of rule strings to arrays of functions", () => {
    const parsed = parseLaravelRules({ name: "required", age: "integer" });
    expect(Object.keys(parsed)).toEqual(["name", "age"]);
    expect(parsed.name).toHaveLength(1);
    expect(parsed.age).toHaveLength(1);
  });

  it("passes through arrays and functions untouched", () => {
    const fn = () => true;
    expect(parseLaravelRules(fn)).toBe(fn);
    const arr = [fn];
    expect(parseLaravelRules(arr)).toBe(arr);
  });
});

describe("mergeRules", () => {
  it("concatenates overlapping keys and adds new ones", () => {
    const a = { name: ["r1"], email: ["r2"] };
    const b = { name: ["r3"], age: ["r4"] };
    expect(mergeRules(a, b)).toEqual({
      name: ["r1", "r3"],
      email: ["r2"],
      age: ["r4"],
    });
  });
});
