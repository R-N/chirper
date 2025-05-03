import _axios from "@/plugins/axios";
import CrudService from "@/services/crud";

class SettingService extends CrudService {
  constructor() {
    super(
      "Setting",
      "/api/system/settings",
      ["index", "store", "show", "update", "destroy"],
      ["key", "type", "value", "options"],
      [],
      true,
      false
    );
  }
}

const settingService = new SettingService();

export { SettingService, settingService };
export default settingService;
