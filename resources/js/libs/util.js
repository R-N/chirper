import dayjs from "dayjs";

export const selectFilled = (obj) => Array.isArray(obj) ? obj.length : obj;

export const isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);

export const filterObject = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));

export const treatAsUTC = (date) => {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
};

export const millisecondsPerDay = 24 * 60 * 60 * 1000;
export const daysBetween = (startDate, endDate) => {
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
};

export const dateAsInt = (date) => {
  return parseInt(date / millisecondsPerDay);
};

export const checkBackend = async (url) => {
  var response = await fetch(url);
  var data = await response.json();
  return data;
};

export const backendUrl = (https, host, port) => {
  var scheme = https ? "https" : "http";
  return scheme + "://" + host + ":" + port;
};

export const replaceArray = (arr, anotherArr) => {
  return Array.prototype.splice.apply(arr, [0, arr.length].concat(anotherArr));
};
export const emptyArray = (arr) => {
  return arr.splice(0, arr.length);
};
export const isObjectEmpty = (obj) => Object.keys(obj.data()).length === 0;
export const addEditFields = (obj, fields) => {
  for (let i = 0; i < fields.length; ++i) {
    obj[fields[i] + "Edit"] = obj[fields[i]];
  }
  return obj;
};
export const addEditFieldsBulk = (arr, fields) => {
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = addEditFields(arr[i], fields);
  }
  return arr;
};
export const isInt = (value) => {
  return (
    !isNaN(value) &&
    (function (x) {
      return (x | 0) === x;
    })(parseFloat(value))
  );
};
export const isInteger = (value) => {
  return isInt(value);
};
export const isStr = (value) => {
  return typeof value === "string" || value instanceof String;
};
export const isString = (value) => {
  return isStr(value);
};
export const isUndefined = (value) => {
  return typeof value === "undefined" || value === null;
};
export const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};
export const toTitleCase2 = (str) => {
  return toTitleCase(str.replace(/_/g, " ")).replace(/\s+/g, "");
};
export const isUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};
export const filterUnique = (array) => {
  return array.filter(isUnique);
};
export const findIndex = (array, obj, key = (x) => x?.id) => {
  obj = key(obj) ?? obj;
  const index = array.findIndex((o) => key(o) === obj);
  return index;
};
export const deleteFromArray = (array, obj, key = (x) => x?.id) => {
  const index = findIndex(array, obj, key);
  if (index < 0) return false;
  array.splice(index, 1);
  return true;
};
export const isPrimitive = (obj) =>
  typeof obj?.[0] !== "object" || obj?.[0] === null;
export const bulkDeleteFromArray = (array, objs, key = (x) => x?.id) => {
  const keysToDelete = new Set(isPrimitive(objs) ? objs : objs.map(key));
  const originalLength = array.length;

  for (let i = array.length - 1; i >= 0; i--) {
    if (keysToDelete.has(key(array[i]))) {
      array.splice(i, 1);
    }
  }

  return originalLength !== array.length;
};
export const jsonToFormData = (json, formData = null, parentKey = "") => {
  formData = formData ?? new FormData();
  for (const key in json) {
    if (!json.hasOwnProperty(key)) continue;

    const value = json[key];
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      jsonToFormData(value, formData, formKey); // Recursively flatten
    } else {
      formData.append(formKey, value);
    }
  }
  return formData;
};

export const arraysEqual = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};
export const arraysEqualUnordered = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    [...a].sort().every((val, index) => val === [...b].sort()[index])
  );
};
export const getArrayText = (
  val,
  f = (v) => v.title,
  array = true,
  separator = ", "
) => {
  if (Array.isArray(val)) {
    let ret = val.map((v) => getArrayText(v, f, array, separator));
    if (Array.isArray(ret) && !array) {
      return ret.join(separator);
    } else {
      return ret;
    }
  } else {
    return f(val);
  }
};
export const getField = (
  obj,
  field,
  array = true,
  fieldSeparator = ".",
  joinSeparator = ", "
) => {
  if (!field) return obj;
  if (Array.isArray(obj)) {
    let ret = val.map((v) =>
      getField(obj, field, array, fieldSeparator, joinSeparator)
    );
    if (Array.isArray(ret) && !array) {
      return ret.join(joinSeparator);
    } else {
      return ret;
    }
  } else {
    const [first, rest] = field.split(/\.(.+)/);
    return getField(obj[first], rest, array, fieldSeparator, joinSeparator);
  }
};
export const timestamp = () => {
  return new Date().toISOString().replace(/[:.]/g, "-");
};
export const getFileName = (response) => {
  const disposition = response.headers["content-disposition"];
  let filename = "downloaded_file";

  if (disposition && disposition.includes("filename=")) {
    const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (match && match[1]) {
      filename = match[1].replace(/['"]/g, ""); // Remove quotes if present
    }
  }
  return filename;
};
export const formatDate = (utcDate) => {
  return dayjs.utc(utcDate).local().format("LLL");
};
export const deepAssign = (base, override) => {
  const result = base;

  for (const key in override) {
    if (
      Object.prototype.hasOwnProperty.call(override, key) &&
      typeof override[key] === "object" &&
      override[key] !== null &&
      !Array.isArray(override[key]) &&
      typeof base[key] === "object" &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepAssign(base[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }

  return result;
};
export const deepMerge = (objects) => {
  return objects.reduce((acc, curr) => deepAssign(acc, curr), {});
};
export const getData = (data, name = null) => {
  if (!data) return null;
  name = name || "item";
  return (
    data?.[name?.toLowerCase()] ??
    data?.[`${name?.toLowerCase()}s`] ??
    data?.data ??
    data?.item ??
    data?.items ??
    data?.value ??
    data?.values ??
    data?.response ??
    data
  );
};
export const isInertiaForm = (obj) => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.data === "function" &&
    typeof obj.submit === "function"
  );
};
export const bindMethod = (cls, obj, methodName) => {
  const method = cls.prototype[methodName];
  if (typeof method !== "function") {
    throw new Error(
      `Method ${methodName} does not exist on ${obj.constructor.name}`
    );
  }
  return method.bind(obj);
};
export const isFunction = (obj) => typeof obj === "function";
export const checkCsrfError = (e) => getData(getData(e))?.message?.toLowerCase().includes("csrf");
