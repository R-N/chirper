import { isObject } from "./util";

export const ruleMapper = {
  required: () => (v) => !!v || 'This field is required',
  string: () => (v) => typeof v === 'string' || 'Must be a string',
  numeric: () => (v) => !isNaN(Number(v)) || 'Must be a number',
  max: (max) => (v) => 
    (typeof v === 'string' && v.length <= max) || 
    (typeof v === 'number' && v <= max) || 
    `Maximum allowed is ${max}`,
  min: (min) => (v) => 
    (typeof v === 'string' && v.length >= min) || 
    (typeof v === 'number' && v >= min) || 
    `Minimum required is ${min}`,
  regex: (pattern) => (v) => 
    pattern.test(v) || 'Invalid format',
  integer: () => (v) => Number.isInteger(Number(v)) || 'Must be an integer', 
  dateFormat: (format) => (v) => {
    const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$/;
    return dateRegex.test(v) || `Date must be in the format ${format}`;
  },
  in: (values) => (v) => {
    const options = values.split(',');
    return options.includes(v) || `Must be one of: ${options.join(', ')}`;
  },
  email: () => (v) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(v) || 'Invalid email address';
  },
};

export const parseLaravelRules = (rules) => {
  if (isObject(rules)) {
    return Object.keys(rules).reduce((acc, key) => {
      const ruleString = rules[key];
      const parsedRules = parseLaravelRules(ruleString);
      acc[key] = parsedRules;
      return acc;
    }, {});
  }
  
  if (typeof rules === 'string')
    rules = rules.split('|');
  rules = rules.map((r) => r.trim());
  const functions = [];

  const hasRequired = rules.includes('required');

  for (const rule of rules) {
    if (rule.includes(':')) {
      const [name, param] = rule.split(':');
      if (ruleMapper[name]) {
        functions.push(wrapOptional(ruleMapper[name](Number(param)), hasRequired));
      }
    } else {
      if (ruleMapper[rule]) {
        functions.push(wrapOptional(ruleMapper[rule](), hasRequired));
      }
    }
  }

  return functions;
}

export const wrapOptional = (
  fn, 
  hasRequired
) => {
  return (v) => {
    if (!hasRequired && (v === null || v === undefined || v === '')) {
      return true;
    }
    return fn(v);
  };
}

export const mergeRules = (rulesA, rulesB) => {
  const merged = { ...rulesA };

  for (const key in rulesB) {
    if (merged[key]) {
      merged[key] = [...merged[key], ...rulesB[key]];
    } else {
      merged[key] = [...rulesB[key]];
    }
  }

  return merged;
}
