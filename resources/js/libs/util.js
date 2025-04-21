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
export const arraysEqual = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
export const arraysEqualUnordered = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    [...a].sort().every((val, index) => val === [...b].sort()[index])
  );
}
export const getArrayText = (val, f=(v) => v.title, array=true, separator=', ') => {
    if(Array.isArray(val)){
        let ret = val.map((v) => getArrayText(v, f, array, separator));
        if(Array.isArray(ret) && !array){
            return ret.join(separator);
        }else{
            return ret;
        }
    }else{
        return f(val);
    }
}
export const getField = (obj, field, array=true, fieldSeparator='.', joinSeparator=', ') => {
  if (!field)
    return obj;
  if(Array.isArray(obj)){
    let ret = val.map((v) => getField(obj, field, array, fieldSeparator, joinSeparator));
    if(Array.isArray(ret) && !array){
        return ret.join(joinSeparator);
    }else{
        return ret;
    }
  }else{
    const [first, rest] = field.split(/\.(.+)/); 
    return getField(obj[first], rest, array, fieldSeparator, joinSeparator);
  }
}
export const timestamp = () => {
  return new Date().toISOString().replace(/[:.]/g, '-');
}
export const getFileName = (response) => {
  const disposition = response.headers['content-disposition'];
  let filename = 'downloaded_file';

  if (disposition && disposition.includes('filename=')) {
    const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (match && match[1]) {
      filename = match[1].replace(/['"]/g, ''); // Remove quotes if present
    }
  }
  return filename;
}
