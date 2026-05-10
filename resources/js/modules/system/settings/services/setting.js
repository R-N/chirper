import _axios from "@/plugins/axios";
import CrudService from "@/services/crud";

class SettingService extends CrudService {
  constructor() {
    super({
      name: "Setting",
      endpoint: "/api/system/settings",
      methods: ["get", "post", "patch", "delete"],
      fields: ["key", "type", "value", "options"],
    });
  }
}

const settingService = new SettingService();

export { SettingService, settingService };
export default settingService;
