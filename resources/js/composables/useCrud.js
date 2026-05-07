import { ref, computed } from "vue";
import { deleteFromArray, isInertiaForm, isObject } from "@/libs/util";
import { t } from "@/plugins/i18n";

export function useCrud({ client, waitBusy, nameField = "name" }) {
  const filteredErrors = ref([]);

  const itemName = computed(() => t("crud.item"));

  function storeItem(item, items) {
    const index = items.value.findIndex((i) => i.id === item.id);
    if (index < 0) {
      items.value.push(item);
    }
  }

  function deleteItem(item, items) {
    deleteFromArray(items.value, item);
  }

  function deleteConfirmText(item) {
    return t("crud.delete_confirm_text", {
      item: itemName.value.toLowerCase(),
      name: item[nameField],
    });
  }

  async function justAsk(item, ask) {
    if (ask) ask();
  }

  async function delete2(item, { items, releaseBusyFlag = true } = {}) {
    return await waitBusy(async () => {
      const ret = await client.delete(item);
      if (items) deleteItem(item, items);
      return ret;
    }, null, releaseBusyFlag);
  }

  async function fetch(options = {}, releaseBusyFlag = true) {
    return await waitBusy(async () => {
      const res = await client.fetch(options);
      return client.getData(res);
    }, null, releaseBusyFlag);
  }

  async function create(form, { items, releaseBusyFlag = true } = {}) {
    return await waitBusy(async () => {
      const res = await client.create(form);
      const data = client.getData(res);
      if (items) storeItem(data, items);
      return data;
    }, null, releaseBusyFlag);
  }

  function setNameConfirmText(item, newValue) {
    return setFieldConfirmText(nameField, item, newValue);
  }

  async function setName(item, newValue, releaseBusyFlag = true) {
    return await setField(nameField, item, newValue, releaseBusyFlag);
  }

  function setFieldConfirmText(fieldName, item, newValue = null, getText = null) {
    let oldValue = item[fieldName];
    if (getText) {
      oldValue = getText(oldValue);
      newValue = getText(newValue);
    }
    return t("crud.set_field_confirm_text", {
      field: fieldName,
      item: itemName.value.toLowerCase(),
      name: item[nameField],
      oldValue,
      newValue,
    });
  }

  async function setField(fieldName, item, value = null, releaseBusyFlag = true, getValue = null) {
    return await waitBusy(async () => {
      const ret = await client[`set_${fieldName}`](item, getValue ? getValue(value) : value);
      const data = client.getData(ret);
      if (isObject(data)) {
        item[fieldName] = data[fieldName];
      } else if (isInertiaForm(value)) {
        item[fieldName] = value[fieldName];
      } else {
        item[fieldName] = value;
      }
      return data;
    }, null, releaseBusyFlag);
  }

  function setEnabledConfirmText(item) {
    return toggleFieldConfirmText("enabled", t("user.disabling"), t("user.enabling"), item);
  }

  async function setEnabled(item, enabled, releaseBusyFlag = true) {
    return await toggleField("enabled", item, enabled, releaseBusyFlag);
  }

  function toggleFieldConfirmText(fieldName, disable, enable, item) {
    const action = item[fieldName] ? disable : enable;
    return t("crud.toggle_field_confirm_text", {
      action,
      field: fieldName,
      item: itemName.value.toLowerCase(),
      name: item[nameField],
    });
  }

  async function toggleField(toggleName, item, enabled, releaseBusyFlag = true) {
    if (enabled === undefined || enabled === null) enabled = !item.enabled;
    return await setField(toggleName, item, enabled, releaseBusyFlag);
  }

  function clearFieldConfirmText(fieldName, item) {
    return t("crud.clear_field_confirm_text", {
      field: fieldName,
      item: itemName.value.toLowerCase(),
      name: item[nameField],
    });
  }

  async function clearField(fieldName, item, releaseBusyFlag = true) {
    return await waitBusy(async () => {
      const ret = await client[`clear_${fieldName}`](item);
      const data = client.getData(ret);
      if (isObject(data)) {
        item[fieldName] = data[fieldName];
      } else {
        item[fieldName] = null;
      }
      return data;
    }, null, releaseBusyFlag);
  }

  async function action(actionName, form, onSuccess = null, releaseBusyFlag = true) {
    return await waitBusy(async () => {
      const ret = await client[actionName](form);
      onSuccess?.();
      return ret;
    }, null, releaseBusyFlag);
  }

  async function get(item_id, releaseBusyFlag = true) {
    return await waitBusy(async () => {
      const ret = await client.get({ id: item_id });
      return client.getData(ret);
    }, null, releaseBusyFlag);
  }

  return {
    nameField,
    client,
    filteredErrors,
    itemName,
    storeItem,
    deleteItem,
    deleteConfirmText,
    justAsk,
    delete2,
    fetch,
    create,
    setNameConfirmText,
    setName,
    setFieldConfirmText,
    setField,
    setEnabledConfirmText,
    setEnabled,
    toggleFieldConfirmText,
    toggleField,
    clearFieldConfirmText,
    clearField,
    action,
    get,
  };
}
