export const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

export const filterObject = (obj, keys) => Object.fromEntries(
  Object.entries(obj).filter(([key]) => keys.includes(key))
);
