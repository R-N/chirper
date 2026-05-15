import type { Component } from "vue";

export { CHIRP_FIELDS, type ChirpFieldName, type ChirpField } from "./generated/ChirpFields";
export { USER_FIELDS, type UserFieldName, type UserField } from "./generated/UserFields";
export { SETTING_FIELDS, type SettingFieldName, type SettingField } from "./generated/SettingFields";
export { ROLE_FIELDS, type RoleFieldName, type RoleField } from "./generated/RoleFields";

export interface FieldOverrides {
  component?: Component;
  getValue?: (item: any) => any;
  onFinish?: (value: any) => void;
  props?: Record<string, any>;
  propsMap?: Record<string, string>;
  editable?: boolean;
  table?: boolean;
  form?: boolean;
  required?: boolean;
  bypassEditableCell?: boolean;
}

export type CrudFields<T extends Record<string, { name: string }>> = Array<
  { [K in keyof T]: T[K] & FieldOverrides }[keyof T]
>;
