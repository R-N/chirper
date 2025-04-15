export const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

export const filterObject = (obj, keys) => Object.fromEntries(
  Object.entries(obj).filter(([key]) => keys.includes(key))
);

export const treatAsUTC = (date) => {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

export const millisecondsPerDay = 24 * 60 * 60 * 1000;
export const daysBetween = (startDate, endDate) => {
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

export const dateAsInt = (date) => {
  return parseInt(date / millisecondsPerDay);
}

export const checkBackend = async (url) => {
  var response = await fetch(url);
  var data = await response.json();
  return data;
}

export const backendUrl = (https, host, port) => {
  var scheme = https ? "https" : "http";
  return scheme + "://" + host + ":" + port;
}

export const replaceArray = (arr, anotherArr) => {
  return Array.prototype.splice.apply(arr, [0, arr.length].concat(anotherArr));
}
export const emptyArray = (arr) => {
  return arr.splice(0, arr.length);
}
export const addEditFields = (obj, fields) => {
  for (let i = 0; i < fields.length; ++i) {
    obj[fields[i] + "Edit"] = obj[fields[i]];
  }
  return obj;
}
export const addEditFieldsBulk = (arr, fields) => {
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = addEditFields(arr[i], fields);
  }
  return arr;
}
export const isInt = (value) => {
  return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value));
}
export const isInteger = (value) => {
  return isInt(value);
}
export const isStr = (value) => {
  return (typeof value === 'string' || value instanceof String);
}
export const isString = (value) =>{
  return isStr(value);
}
export const isUndefined = (value) => {
  return (typeof value === 'undefined' || value === null);
}
export const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
export const toTitleCase2 = (str) => {
  return toTitleCase(str.replace(/_/g, ' ')).replace(/\s+/g, '');
}
export const isUnique = (value, index, array) => {
  return array.indexOf(value) === index;
}
export const filterUnique = (array) => {
  return array.filter(isUnique);
}
export const findIndex = (array, obj, key = (x) => x?.id) => {
  obj = key(obj) ?? obj;
  const index = array.findIndex(o => key(o) === obj);
  return index;
}
export const deleteFromArray = (array, obj, key = (x) => x?.id) => {
  const index = findIndex(array, obj, key);
  if (index < 0) 
    return false;
  array.splice(index, 1);
  return true;
}
