import { deepAssign } from "@/libs/util";

export function useCrudForm({ client, formData, data, updateFunction = "update", storeFunction = "store" }) {
  async function submit({ validate, valid, waitBusy, getValue, onSubmit, emit, close }) {
    validate();
    if (!valid.value) return;

    return await waitBusy(async () => {
      let res = null;
      let dataResult = null;
      if (data.value) {
        res = await client[updateFunction](data.value, formData);
        dataResult = client.getData(res);
        if (dataResult) {
          deepAssign(data.value, dataResult);
        }
      } else {
        res = await client[storeFunction](formData);
        dataResult = client.getData(res);
      }
      if (onSubmit) {
        await onSubmit(dataResult || getValue());
      } else {
        emit("submit", dataResult || getValue());
      }
      close();
      return dataResult;
    });
  }

  return {
    submit,
  };
}
